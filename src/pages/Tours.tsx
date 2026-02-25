import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import TourCard, { Tour } from "@/components/TourCard";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";
import turkeyImg from "@/assets/turkey.jpg";
import dubaiImg from "@/assets/dubai.jpg";
import sharmImg from "@/assets/sharm.jpg";
import maldivesImg from "@/assets/maldives.jpg";
import hotToursImg from "@/assets/hot-tours.jpg";

// Fallback tours for when DB is empty
const fallbackTours: Tour[] = [
  { id: "1", title: "Анталья All Inclusive", location: "Турция", image: turkeyImg, price: "от 285 000 ₸", dates: "7 ночей", rating: 4.9, tag: "Хит" },
  { id: "2", title: "Дубай Марина", location: "ОАЭ", image: dubaiImg, price: "от 420 000 ₸", dates: "5 ночей", rating: 4.8, tag: "Люкс" },
  { id: "3", title: "Reef Oasis Resort", location: "Шарм-эль-Шейх", image: sharmImg, price: "от 310 000 ₸", dates: "7 ночей", rating: 4.7 },
  { id: "4", title: "Sun Island Resort", location: "Мальдивы", image: maldivesImg, price: "от 890 000 ₸", dates: "7 ночей", rating: 5.0, tag: "Мечта" },
  { id: "5", title: "Горящий — Кемер", location: "Турция", image: hotToursImg, price: "от 195 000 ₸", dates: "7 ночей", rating: 4.6, tag: "🔥" },
  { id: "6", title: "Atlantis The Palm", location: "Дубай", image: dubaiImg, price: "от 750 000 ₸", dates: "5 ночей", rating: 4.9, tag: "Премиум" },
];

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      const { data } = await supabase
        .from("tours")
        .select("*")
        .in("status", ["active", "hot"])
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setTours(
          data.map((t: any) => ({
            id: t.id,
            title: t.title,
            location: t.location,
            image: t.image_url || turkeyImg,
            price: t.price,
            dates: t.dates,
            rating: t.rating || 4.5,
            tag: t.status === "hot" ? "🔥 Горящий" : t.tag || undefined,
            slug: t.slug,
          }))
        );
      } else {
        setTours(fallbackTours);
      }
      setLoading(false);
    };
    fetchTours();
  }, []);

  return (
    <Layout>
      <section className="pt-28 pb-20 container mx-auto px-6">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">Все туры</h1>
          <p className="text-muted-foreground mb-12 max-w-lg">Лучшие предложения из Алматы на ближайшие даты</p>
        </AnimatedSection>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour, i) => (
              <AnimatedSection key={tour.id} delay={i * 0.06}>
                {"slug" in tour && (tour as any).slug ? (
                  <Link to={`/tour/${(tour as any).slug}`}>
                    <TourCard tour={tour} />
                  </Link>
                ) : (
                  <TourCard tour={tour} />
                )}
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Tours;
