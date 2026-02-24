import DestinationPageTemplate from "@/components/DestinationPageTemplate";
import turkeyImg from "@/assets/turkey.jpg";
import hotToursImg from "@/assets/hot-tours.jpg";

const tours = [
  { id: "t1", title: "Анталья All Inclusive 5*", location: "Анталья, Турция", image: turkeyImg, price: "от 285 000 ₸", dates: "7 ночей", rating: 4.9, tag: "Хит" },
  { id: "t2", title: "Кемер Family Resort", location: "Кемер, Турция", image: hotToursImg, price: "от 245 000 ₸", dates: "7 ночей", rating: 4.7 },
  { id: "t3", title: "Bodrum Luxury Spa", location: "Бодрум, Турция", image: turkeyImg, price: "от 380 000 ₸", dates: "10 ночей", rating: 4.8, tag: "Люкс" },
];

const TurkeyFromAlmaty = () => (
  <DestinationPageTemplate
    title="Туры в Турцию из Алматы"
    subtitle="Прямые рейсы каждый день"
    metaTitle="Туры в Турцию из Алматы 2025 — горящие путёвки | TravelLux"
    metaDescription="Горящие туры в Турцию из Алматы. All Inclusive от 245 000 ₸. Прямые рейсы, лучшие 5* отели. Бронирование онлайн."
    description="Турция — самое популярное направление из Алматы. Прямые рейсы, all-inclusive отели, тёплое Средиземное море и невероятная история."
    heroImage={turkeyImg}
    tours={tours}
    features={[
      "Прямые рейсы из Алматы — 4.5 часа",
      "All Inclusive в лучших 5* отелях",
      "Безвизовый режим для граждан КЗ",
      "Детские программы и аквапарки",
      "Экскурсии: Стамбул, Каппадокия, Памуккале",
      "Шопинг-туры с персональным гидом",
    ]}
    faqs={[
      { q: "Сколько стоит тур в Турцию из Алматы?", a: "Стоимость туров начинается от 245 000 ₸ за 7 ночей с All Inclusive. Цена зависит от отеля, дат и количества гостей." },
      { q: "Нужна ли виза в Турцию?", a: "Нет, для граждан Казахстана виза в Турцию не требуется при пребывании до 30 дней." },
      { q: "Какое время перелёта?", a: "Прямой рейс из Алматы в Анталью занимает около 4.5 часов." },
      { q: "Когда лучше ехать?", a: "Пляжный сезон — с мая по октябрь. Для экскурсий идеальны весна и осень." },
    ]}
  />
);

export default TurkeyFromAlmaty;
