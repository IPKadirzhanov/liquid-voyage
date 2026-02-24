import DestinationPageTemplate from "@/components/DestinationPageTemplate";
import hotToursImg from "@/assets/hot-tours.jpg";
import turkeyImg from "@/assets/turkey.jpg";
import sharmImg from "@/assets/sharm.jpg";

const tours = [
  { id: "h1", title: "Горящий — Кемер 5*", location: "Турция", image: turkeyImg, price: "от 195 000 ₸", dates: "7 ночей", rating: 4.6, tag: "🔥 -40%" },
  { id: "h2", title: "Горящий — Хургада", location: "Египет", image: sharmImg, price: "от 220 000 ₸", dates: "7 ночей", rating: 4.5, tag: "🔥 -35%" },
  { id: "h3", title: "Last Minute — Анталья", location: "Турция", image: hotToursImg, price: "от 175 000 ₸", dates: "5 ночей", rating: 4.4, tag: "🔥 -50%" },
];

const HotTours = () => (
  <DestinationPageTemplate
    title="Горящие туры из Алматы"
    subtitle="Скидки до 50%"
    metaTitle="Горящие туры из Алматы 2025 — скидки до 50% | TravelLux"
    metaDescription="Горящие туры из Алматы со скидками до 50%. Турция, Египет, ОАЭ. Вылет в ближайшие дни!"
    description="Лучшие горящие предложения обновляются каждый день. Успейте забронировать тур мечты по невероятной цене."
    heroImage={hotToursImg}
    tours={tours}
    features={[
      "Обновление предложений каждый час",
      "Скидки до 50% от обычной цены",
      "Вылет в ближайшие 1-5 дней",
      "Только проверенные отели 4-5*",
      "Полная страховка включена",
      "Оформление за 30 минут",
    ]}
    faqs={[
      { q: "Что такое горящий тур?", a: "Это тур со значительной скидкой, который нужно бронировать быстро — вылет через 1-5 дней." },
      { q: "Почему так дёшево?", a: "Туроператоры продают оставшиеся места по сниженным ценам, чтобы заполнить рейсы и отели." },
      { q: "Как быстро нужно решиться?", a: "Горящие туры обычно актуальны 24-48 часов. Рекомендуем бронировать сразу." },
    ]}
  />
);

export default HotTours;
