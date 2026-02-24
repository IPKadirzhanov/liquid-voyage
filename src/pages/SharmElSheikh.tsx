import DestinationPageTemplate from "@/components/DestinationPageTemplate";
import sharmImg from "@/assets/sharm.jpg";

const tours = [
  { id: "s1", title: "Reef Oasis Resort 5*", location: "Шарм-эль-Шейх", image: sharmImg, price: "от 310 000 ₸", dates: "7 ночей", rating: 4.7, tag: "Дайвинг" },
  { id: "s2", title: "Rixos Premium Seagate", location: "Шарм-эль-Шейх", image: sharmImg, price: "от 450 000 ₸", dates: "7 ночей", rating: 4.9, tag: "Премиум" },
  { id: "s3", title: "Royal Grand Sharm", location: "Шарм-эль-Шейх", image: sharmImg, price: "от 270 000 ₸", dates: "7 ночей", rating: 4.5 },
];

const SharmElSheikh = () => (
  <DestinationPageTemplate
    title="Туры в Шарм-эль-Шейх"
    subtitle="Красное море и кораллы"
    metaTitle="Туры в Шарм-эль-Шейх из Алматы 2025 | TravelLux"
    metaDescription="Туры в Шарм-эль-Шейх из Алматы. Лучший дайвинг, 5* отели, All Inclusive от 270 000 ₸."
    description="Шарм-эль-Шейх — рай для дайверов и любителей пляжного отдыха. Круглогодичное тепло и лучшие коралловые рифы мира."
    heroImage={sharmImg}
    tours={tours}
    features={[
      "Лучшие коралловые рифы в мире",
      "Круглогодичная температура 25-35°C",
      "All Inclusive отели 4-5*",
      "Дайвинг и снорклинг",
      "Экскурсии: Каир, пирамиды, Луксор",
      "Доступные цены от 270 000 ₸",
    ]}
    faqs={[
      { q: "Нужна ли виза в Египет?", a: "Виза оформляется по прилёту в аэропорту ($25) или можно получить бесплатный синайский штамп на 15 дней." },
      { q: "Когда лучше ехать?", a: "Круглый год! Зимой 20-25°C, летом 30-35°C. Вода всегда тёплая." },
      { q: "Можно ли нырять без опыта?", a: "Да, все отели предлагают курсы дайвинга для новичков с инструктором." },
    ]}
  />
);

export default SharmElSheikh;
