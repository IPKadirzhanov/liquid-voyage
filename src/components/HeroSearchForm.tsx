import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";

const HeroSearchForm = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.7 }}
    className="glass-strong rounded-3xl p-6 md:p-8 max-w-4xl mx-auto shimmer"
  >
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-3">
        <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Куда</p>
          <select className="w-full bg-transparent text-sm font-medium text-foreground outline-none">
            <option>Турция</option>
            <option>Дубай</option>
            <option>Шарм-эль-Шейх</option>
            <option>Мальдивы</option>
            <option>Таиланд</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-3">
        <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Дата</p>
          <input type="date" className="w-full bg-transparent text-sm font-medium text-foreground outline-none" />
        </div>
      </div>

      <div className="flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-3">
        <Users className="h-5 w-5 text-primary flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Гостей</p>
          <select className="w-full bg-transparent text-sm font-medium text-foreground outline-none">
            <option>2 взрослых</option>
            <option>1 взрослый</option>
            <option>2 взрослых + 1 ребёнок</option>
            <option>2 взрослых + 2 ребёнка</option>
          </select>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="btn-primary-glow flex items-center justify-center gap-2 text-base"
      >
        <Search size={18} />
        Найти тур
      </motion.button>
    </div>
  </motion.div>
);

export default HeroSearchForm;
