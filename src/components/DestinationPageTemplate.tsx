import { motion } from "framer-motion";
import { MapPin, CheckCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import Layout from "./Layout";
import AnimatedSection from "./AnimatedSection";
import TourCard, { Tour } from "./TourCard";

interface FAQ {
  q: string;
  a: string;
}

interface DestinationPageProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  tours: Tour[];
  features: string[];
  faqs: FAQ[];
  metaTitle: string;
  metaDescription: string;
}

const DestinationPageTemplate = ({
  title,
  subtitle,
  description,
  heroImage,
  tours,
  features,
  faqs,
}: DestinationPageProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative container mx-auto px-6 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 text-primary mb-2">
              <MapPin size={18} />
              <span className="text-sm font-medium">{subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{title}</h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <AnimatedSection>
          <div className="glass-strong rounded-3xl p-8">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Почему стоит поехать</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-turquoise flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Tours */}
      <section className="container mx-auto px-6 pb-16">
        <AnimatedSection>
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Популярные туры</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map((tour, i) => (
            <AnimatedSection key={tour.id} delay={i * 0.1}>
              <TourCard tour={tour} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 pb-20">
        <AnimatedSection>
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Часто задаваемые вопросы</h2>
        </AnimatedSection>
        <div className="max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left glass-strong rounded-2xl p-5 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-foreground">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={18} className="text-muted-foreground" />
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-muted-foreground pt-3 leading-relaxed">{faq.a}</p>
                </motion.div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-16">
        <AnimatedSection>
          <div className="glass-strong rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Готовы к путешествию?</h2>
            <p className="text-muted-foreground mb-6">Оставьте заявку и мы подберём лучший тур за 5 минут</p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/77001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-primary-glow text-lg"
            >
              Написать в WhatsApp
            </motion.a>
          </div>
        </AnimatedSection>
      </section>
    </Layout>
  );
};

export default DestinationPageTemplate;
