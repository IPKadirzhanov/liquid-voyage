import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Globe, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import HeroSearchForm from "@/components/HeroSearchForm";
import TourCard, { Tour } from "@/components/TourCard";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/hero-beach.jpg";
import turkeyImg from "@/assets/turkey.jpg";
import dubaiImg from "@/assets/dubai.jpg";
import sharmImg from "@/assets/sharm.jpg";
import maldivesImg from "@/assets/maldives.jpg";
import hotToursImg from "@/assets/hot-tours.jpg";

const featuredTours: Tour[] = [
  { id: "1", title: "Анталья All Inclusive", location: "Турция", image: turkeyImg, price: "от 285 000 ₸", dates: "7 ночей", rating: 4.9, tag: "Хит" },
  { id: "2", title: "Дубай Марина", location: "ОАЭ", image: dubaiImg, price: "от 420 000 ₸", dates: "5 ночей", rating: 4.8, tag: "Люкс" },
  { id: "3", title: "Reef Oasis Resort", location: "Шарм-эль-Шейх", image: sharmImg, price: "от 310 000 ₸", dates: "7 ночей", rating: 4.7 },
  { id: "4", title: "Sun Island Resort", location: "Мальдивы", image: maldivesImg, price: "от 890 000 ₸", dates: "7 ночей", rating: 5.0, tag: "Мечта" },
  { id: "5", title: "Горящий тур — Кемер", location: "Турция", image: hotToursImg, price: "от 195 000 ₸", dates: "7 ночей", rating: 4.6, tag: "🔥 Горящий" },
  { id: "6", title: "Atlantis The Palm", location: "Дубай", image: dubaiImg, price: "от 750 000 ₸", dates: "5 ночей", rating: 4.9, tag: "Премиум" },
];

const destinations = [
  { title: "Турция из Алматы", image: turkeyImg, to: "/turkey-from-almaty", desc: "Пляжи, история, all-inclusive" },
  { title: "Туры в Дубай", image: dubaiImg, to: "/dubai-tours", desc: "Роскошь, шопинг, небоскрёбы" },
  { title: "Горящие туры", image: hotToursImg, to: "/hot-tours", desc: "Лучшие цены каждый день" },
  { title: "Шарм-эль-Шейх", image: sharmImg, to: "/sharm-el-sheikh", desc: "Коралловые рифы, дайвинг" },
];

const stats = [
  { value: "10 000+", label: "Довольных клиентов" },
  { value: "50+", label: "Направлений" },
  { value: "24/7", label: "Поддержка" },
  { value: "9 лет", label: "На рынке" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Тропический пляж" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />

        {/* Floating glass orbs */}
        <motion.div
          className="absolute top-32 left-10 w-40 h-40 rounded-full bg-sky/10 blur-3xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 right-10 w-60 h-60 rounded-full bg-turquoise/10 blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 container mx-auto px-6 text-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Туры мечты из Алматы</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
              Путешествуйте красиво.
              <br />
              <span className="gradient-text">Бронируйте умно.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
            >
              Подбор туров + мгновенный ответ 24/7
            </motion.p>
          </motion.div>

          <HeroSearchForm />
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 -mt-8 relative z-20">
        <div className="glass-strong rounded-3xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="container mx-auto px-6 py-20">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Популярные направления</h2>
              <p className="text-muted-foreground mt-2">Лучшие предложения из Алматы</p>
            </div>
            <Link to="/tours" className="hidden md:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">
              Все направления <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((dest, i) => (
            <AnimatedSection key={dest.to} delay={i * 0.1}>
              <Link to={dest.to}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative h-72 rounded-3xl overflow-hidden group cursor-pointer card-glass"
                >
                  <img src={dest.image} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-serif font-bold text-primary-foreground">{dest.title}</h3>
                    <p className="text-primary-foreground/80 text-sm">{dest.desc}</p>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Featured Tours */}
      <section className="container mx-auto px-6 pb-20">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Лучшие туры</h2>
          <p className="text-muted-foreground mb-10">Проверенные отели с высоким рейтингом</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTours.map((tour, i) => (
            <AnimatedSection key={tour.id} delay={i * 0.08}>
              <TourCard tour={tour} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="container mx-auto px-6 pb-20">
        <AnimatedSection>
          <div className="glass-strong rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12">Почему TravelLux</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Globe, title: "50+ направлений", desc: "Турция, ОАЭ, Египет, Мальдивы и ещё десятки стран" },
                { icon: Shield, title: "Гарантия цены", desc: "Найдёте дешевле — вернём разницу и добавим скидку" },
                { icon: Clock, title: "Ответ за 5 минут", desc: "AI-консультант 24/7 + живой менеджер в WhatsApp" },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.15}>
                  <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 glow-ring">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-20">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden">
            <img src={maldivesImg} alt="Мальдивы" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40 flex items-center">
              <div className="px-10 md:px-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Готовы к приключению?</h2>
                <p className="text-muted-foreground mb-6 max-w-md">Оставьте заявку и получите подборку лучших туров за 5 минут</p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/77001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block btn-primary-glow"
                >
                  Получить подборку
                </motion.a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </Layout>
  );
};

export default Index;
