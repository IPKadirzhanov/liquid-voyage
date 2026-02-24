import Layout from "@/components/Layout";
import TourCard, { Tour } from "@/components/TourCard";
import AnimatedSection from "@/components/AnimatedSection";
import turkeyImg from "@/assets/turkey.jpg";
import dubaiImg from "@/assets/dubai.jpg";
import sharmImg from "@/assets/sharm.jpg";
import maldivesImg from "@/assets/maldives.jpg";
import hotToursImg from "@/assets/hot-tours.jpg";

const allTours: Tour[] = [
  { id: "1", title: "Анталья All Inclusive", location: "Турция", image: turkeyImg, price: "от 285 000 ₸", dates: "7 ночей", rating: 4.9, tag: "Хит" },
  { id: "2", title: "Дубай Марина", location: "ОАЭ", image: dubaiImg, price: "от 420 000 ₸", dates: "5 ночей", rating: 4.8, tag: "Люкс" },
  { id: "3", title: "Reef Oasis Resort", location: "Шарм-эль-Шейх", image: sharmImg, price: "от 310 000 ₸", dates: "7 ночей", rating: 4.7 },
  { id: "4", title: "Sun Island Resort", location: "Мальдивы", image: maldivesImg, price: "от 890 000 ₸", dates: "7 ночей", rating: 5.0, tag: "Мечта" },
  { id: "5", title: "Горящий — Кемер", location: "Турция", image: hotToursImg, price: "от 195 000 ₸", dates: "7 ночей", rating: 4.6, tag: "🔥" },
  { id: "6", title: "Atlantis The Palm", location: "Дубай", image: dubaiImg, price: "от 750 000 ₸", dates: "5 ночей", rating: 4.9, tag: "Премиум" },
  { id: "7", title: "Bodrum Palace", location: "Турция", image: turkeyImg, price: "от 340 000 ₸", dates: "10 ночей", rating: 4.8 },
  { id: "8", title: "Rixos Sharm", location: "Египет", image: sharmImg, price: "от 365 000 ₸", dates: "7 ночей", rating: 4.7 },
  { id: "9", title: "Paradise Island", location: "Мальдивы", image: maldivesImg, price: "от 1 200 000 ₸", dates: "10 ночей", rating: 5.0, tag: "VIP" },
];

const Tours = () => (
  <Layout>
    <section className="pt-28 pb-20 container mx-auto px-6">
      <AnimatedSection>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">Все туры</h1>
        <p className="text-muted-foreground mb-12 max-w-lg">Лучшие предложения из Алматы на ближайшие даты</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTours.map((tour, i) => (
          <AnimatedSection key={tour.id} delay={i * 0.06}>
            <TourCard tour={tour} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  </Layout>
);

export default Tours;
