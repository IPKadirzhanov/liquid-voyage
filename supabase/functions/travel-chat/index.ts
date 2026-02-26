import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Fetch active tours from database for context
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: tours } = await supabase
      .from("tours")
      .select("title, location, destination, price, dates, rating, tag, slug, status")
      .in("status", ["active", "hot"])
      .limit(30);

    let toursContext = "";
    if (tours && tours.length > 0) {
      toursContext = `\n\nАктуальные туры в базе:\n${tours.map((t: any) => 
        `- ${t.title} | ${t.location} | ${t.price} | ${t.dates} | Рейтинг: ${t.rating}${t.tag ? ` | ${t.tag}` : ""}${t.status === "hot" ? " | 🔥 ГОРЯЩИЙ" : ""}`
      ).join("\n")}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: `Ты — AI-консультант премиального туристического агентства TravelLux в Алматы. 
Твоя задача — помочь клиенту подобрать идеальный тур.

Правила:
- Отвечай коротко и дружелюбно, максимум 2-3 предложения
- Используй эмодзи умеренно
- Спрашивай: куда хочет поехать, бюджет, даты, количество людей
- Предлагай конкретные туры из базы данных (см. ниже)
- Если подходящий тур найден, предложи его с ценой и деталями
- Когда есть достаточно информации — предложи связаться с менеджером через WhatsApp
- Для передачи в WhatsApp формируй ссылку: https://wa.me/77479481318?text=ТЕКСТ где ТЕКСТ — краткое резюме запроса клиента (направление, даты, бюджет, количество гостей)
- Говори на русском языке
- Ты работаешь 24/7
- Агентство находится в Алматы, ул. Абая 150
- Телефон: +7 747 948 13 18
${toursContext}`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Слишком много запросов, попробуйте через минуту." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Сервис временно недоступен." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Ошибка AI сервиса" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
