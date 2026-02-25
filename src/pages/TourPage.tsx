import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";

interface TourDetail {
  id: string;
  title: string;
  location: string;
  destination: string | null;
  price: string;
  dates: string;
  rating: number | null;
  tag: string | null;
  image_url: string | null;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
}

const TourPage = () => {
  const { slug } = useParams();
  const [tour, setTour] = useState<TourDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      const { data } = await supabase
        .from("tours")
        .select("*")
        .eq("slug", slug)
        .in("status", ["active", "hot"])
        .single();

      setTour(data as TourDetail | null);
      setLoading(false);
    };
    fetchTour();
  }, [slug]);

  useEffect(() => {
    if (tour?.seo_title) document.title = tour.seo_title;
  }, [tour]);

  if (loading) {
    return (
      <Layout>
        <div className="pt-28 pb-20 container mx-auto px-6 flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!tour) {
    return (
      <Layout>
        <div className="pt-28 pb-20 container mx-auto px-6 text-center">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Тур не найден</h1>
          <Link to="/tours" className="text-primary hover:underline">← Все туры</Link>
        </div>
      </Layout>
    );
  }

  const whatsappText = encodeURIComponent(`Здравствуйте! Интересует тур: ${tour.title}, ${tour.location}, ${tour.price}`);

  return (
    <Layout>
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <Link to="/tours" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft size={14} /> Все туры
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <AnimatedSection>
              <div className="relative rounded-3xl overflow-hidden">
                {tour.image_url ? (
                  <img src={tour.image_url} alt={tour.title} className="w-full h-96 object-cover" />
                ) : (
                  <div className="w-full h-96 bg-muted flex items-center justify-center text-muted-foreground">Нет фото</div>
                )}
                {tour.tag && (
                  <span className="absolute top-4 right-4 btn-primary-glow !py-1.5 !px-4 text-sm !rounded-full">
                    {tour.tag}
                  </span>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">{tour.title}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={16} /> {tour.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={16} /> {tour.dates}</span>
                    {tour.rating && (
                      <span className="flex items-center gap-1"><Star size={16} className="fill-secondary text-secondary" /> {tour.rating}</span>
                    )}
                  </div>
                </div>

                {tour.description && (
                  <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
                )}

                <div className="glass-strong rounded-2xl p-6">
                  <p className="text-3xl font-bold gradient-text mb-4">{tour.price}</p>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={`https://wa.me/77001234567?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-glow w-full block text-center"
                  >
                    Забронировать через WhatsApp
                  </motion.a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TourPage;
