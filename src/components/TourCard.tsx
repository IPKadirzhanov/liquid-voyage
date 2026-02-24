import { motion } from "framer-motion";
import { MapPin, Calendar, Star } from "lucide-react";

export interface Tour {
  id: string;
  title: string;
  location: string;
  image: string;
  price: string;
  dates: string;
  rating: number;
  tag?: string;
}

const TourCard = ({ tour }: { tour: Tour }) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="card-glass group cursor-pointer"
  >
    <div className="relative overflow-hidden h-56">
      <motion.img
        src={tour.image}
        alt={tour.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
      {tour.tag && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 btn-primary-glow !py-1 !px-3 text-xs !rounded-full"
        >
          {tour.tag}
        </motion.span>
      )}
      <div className="absolute bottom-3 left-3 flex items-center gap-1">
        <Star className="h-4 w-4 fill-secondary text-secondary" />
        <span className="text-primary-foreground text-sm font-medium">{tour.rating}</span>
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{tour.title}</h3>
      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
        <MapPin size={14} /> {tour.location}
      </div>
      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
        <Calendar size={14} /> {tour.dates}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold gradient-text">{tour.price}</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-glass text-sm !py-2 !px-4"
        >
          Подробнее
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default TourCard;
