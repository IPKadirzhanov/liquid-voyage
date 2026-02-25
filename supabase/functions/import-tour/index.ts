import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { url } = await req.json();
    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 1: Scrape URL with Firecrawl
    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    if (!FIRECRAWL_API_KEY) {
      return new Response(JSON.stringify({ error: "Firecrawl not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`;
    }

    console.log("Scraping URL:", formattedUrl);

    const scrapeResp = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ["markdown", "screenshot"],
        onlyMainContent: true,
        waitFor: 3000,
      }),
    });

    const scrapeData = await scrapeResp.json();

    if (!scrapeResp.ok || !scrapeData.success) {
      console.error("Firecrawl error:", scrapeData);
      return new Response(
        JSON.stringify({ error: "Failed to scrape the page. Check the URL and try again." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const markdown = scrapeData.data?.markdown || scrapeData.markdown || "";
    const screenshot = scrapeData.data?.screenshot || scrapeData.screenshot || "";
    const metadata = scrapeData.data?.metadata || scrapeData.metadata || {};

    if (!markdown) {
      return new Response(
        JSON.stringify({ error: "No content found on the page" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: Extract structured data using AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a data extraction specialist for a travel agency. Extract tour/hotel information from the provided page content.
Return ONLY a valid JSON object (no markdown, no code blocks) with these fields:
{
  "title": "Hotel/tour name",
  "location": "City, Country",
  "destination": "Country name only (e.g. Турция, ОАЭ, Египет, Мальдивы, Таиланд)",
  "description": "Brief description in Russian (2-3 sentences)",
  "price": "Price in format 'от XXX XXX ₸' (convert to KZT if needed, 1 USD ≈ 450 KZT, 1 EUR ≈ 490 KZT)",
  "dates": "Duration like '7 ночей'",
  "rating": 4.5,
  "image_url": "Main image URL from the page if found, or empty string",
  "tag": "One of: Хит, Люкс, Премиум, 🔥 Горящий, Мечта, VIP, Новинка, or empty"
}
If a field is not found, provide a reasonable default. Always respond in Russian for text fields.`,
          },
          {
            role: "user",
            content: `Extract tour data from this page:\n\nURL: ${formattedUrl}\nTitle: ${metadata.title || ""}\n\n${markdown.slice(0, 8000)}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_tour_data",
              description: "Extract structured tour data from a webpage",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Hotel or tour name" },
                  location: { type: "string", description: "City, Country" },
                  destination: { type: "string", description: "Country name" },
                  description: { type: "string", description: "Brief description in Russian" },
                  price: { type: "string", description: "Price in KZT format" },
                  dates: { type: "string", description: "Duration" },
                  rating: { type: "number", description: "Rating 1-5" },
                  image_url: { type: "string", description: "Main image URL" },
                  tag: { type: "string", description: "Tag label" },
                },
                required: ["title", "location", "destination", "description", "price", "dates"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "extract_tour_data" } },
      }),
    });

    if (!aiResp.ok) {
      const errText = await aiResp.text();
      console.error("AI error:", aiResp.status, errText);

      if (aiResp.status === 429) {
        return new Response(JSON.stringify({ error: "Слишком много запросов, попробуйте через минуту" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "AI extraction failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResp.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    
    let tourData;
    if (toolCall?.function?.arguments) {
      tourData = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback: try to parse from content
      const content = aiData.choices?.[0]?.message?.content || "";
      try {
        tourData = JSON.parse(content.replace(/```json?\n?/g, "").replace(/```/g, "").trim());
      } catch {
        return new Response(JSON.stringify({ error: "Failed to parse AI response" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Use screenshot as fallback image
    if (!tourData.image_url && screenshot) {
      tourData.image_url = `data:image/png;base64,${screenshot}`;
    }

    // Generate slug
    const slug = tourData.title
      .toLowerCase()
      .replace(/[^a-zа-яё0-9\s]/gi, "")
      .replace(/\s+/g, "-")
      .replace(/[а-яё]/g, (c: string) => {
        const map: Record<string, string> = {
          а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
          з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
          п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
          ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
        };
        return map[c] || c;
      })
      .slice(0, 80);

    const result = {
      ...tourData,
      slug,
      source_url: formattedUrl,
      seo_title: `${tourData.title} — TravelLux`,
      seo_description: tourData.description?.slice(0, 155) || "",
      rating: tourData.rating || 4.5,
      status: "active",
    };

    console.log("Extracted tour:", result.title);

    return new Response(JSON.stringify({ success: true, tour: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Import error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
