import DestinationPageTemplate from "@/components/DestinationPageTemplate";
import dubaiImg from "@/assets/dubai.jpg";

const tours = [
  { id: "d1", title: "Дубай Марина 5*", location: "Дубай, ОАЭ", image: dubaiImg, price: "от 420 000 ₸", dates: "5 ночей", rating: 4.8, tag: "Люкс" },
  { id: "d2", title: "Atlantis The Palm", location: "Дубай, ОАЭ", image: dubaiImg, price: "от 750 000 ₸", dates: "5 ночей", rating: 4.9, tag: "Премиум" },
  { id: "d3", title: "JBR Beach Hotel", location: "Дубай, ОАЭ", image: dubaiImg, price: "от 350 000 ₸", dates: "4 ночи", rating: 4.7 },
];

const DubaiTours = () => (
  <DestinationPageTemplate
    title="Туры в Дубай"
    subtitle="Роскошь и технологии"
    metaTitle="Туры в Дубай из Алматы 2025 — лучшие цены | TravelLux"
    metaDescription="Премиальные туры в Дубай из Алматы. Отели 5*, экскурсии, шопинг. Бронирование от 350 000 ₸."
    description="Дубай — город будущего. Небоскрёбы, роскошные отели, мировой шопинг и незабываемые развлечения."
    heroImage={dubaiImg}
    tours={tours}
    features={[
      "Прямые рейсы Air Astana и FlyDubai",
      "Лучшие 5* отели на берегу океана",
      "Экскурсии: Бурдж-Халифа, пустыня, морские круизы",
      "Шопинг в Dubai Mall и Mall of the Emirates",
      "Аквапарки и парки развлечений",
      "Безвизовый режим для граждан КЗ",
    ]}
    faqs={[
      { q: "Сколько стоит тур в Дубай?", a: "Туры от 350 000 ₸ за 4 ночи. Премиум-варианты от 750 000 ₸." },
      { q: "Какая погода в Дубае?", a: "Лучшее время — с октября по апрель, температура 25-30°C." },
      { q: "Нужна ли виза?", a: "Нет, для граждан Казахстана виза в ОАЭ не требуется (до 30 дней)." },
    ]}
  />
);

export default DubaiTours;
