import { motion } from "framer-motion";
import { Heart, Award, Users, Plane } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/hero-beach.jpg";

const team = [
  { name: "Айгерим Нурланова", role: "Основатель & CEO", emoji: "👩‍💼" },
  { name: "Дамир Касымов", role: "Директор по продажам", emoji: "👨‍💼" },
  { name: "Мадина Сулейменова", role: "Менеджер по турам", emoji: "👩‍✈️" },
  { name: "Арман Жумабеков", role: "AI & технологии", emoji: "👨‍💻" },
];

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[50vh] min-h-[350px] flex items-end">
      <img src={heroImg} alt="TravelLux команда" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="relative container mx-auto px-6 pb-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">О компании</h1>
        </motion.div>
      </div>
    </section>

    {/* Mission */}
    <section className="container mx-auto px-6 py-16">
      <AnimatedSection>
        <div className="glass-strong rounded-3xl p-10 md:p-16 max-w-4xl mx-auto text-center">
          <Heart className="h-10 w-10 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Наша миссия</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Сделать путешествия доступными и незабываемыми для каждого жителя Алматы.
            Мы используем AI-технологии и 9-летний опыт, чтобы подбирать идеальные туры
            за минуты, а не дни.
          </p>
        </div>
      </AnimatedSection>
    </section>

    {/* Values */}
    <section className="container mx-auto px-6 pb-16">
      <AnimatedSection>
        <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">Наши ценности</h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          { icon: Award, title: "Качество", desc: "Только проверенные отели и туроператоры" },
          { icon: Users, title: "Клиент в центре", desc: "Индивидуальный подход к каждому путешественнику" },
          { icon: Plane, title: "Инновации", desc: "AI-подбор туров и мгновенная поддержка" },
        ].map((v, i) => (
          <AnimatedSection key={i} delay={i * 0.15}>
            <motion.div whileHover={{ y: -5 }} className="card-glass p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 glow-ring">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </section>

    {/* Team */}
    <section className="container mx-auto px-6 pb-20">
      <AnimatedSection>
        <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">Наша команда</h2>
      </AnimatedSection>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {team.map((person, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="card-glass p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-3xl">
                {person.emoji}
              </div>
              <h3 className="font-semibold text-sm text-foreground">{person.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{person.role}</p>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  </Layout>
);

export default About;
