import { Link } from "react-router-dom";
import { Plane, Phone, Mail, MapPin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const Footer = () => (
  <footer className="relative mt-20">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ocean-deep/5" />
    <div className="relative glass-strong border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-6 w-6 text-primary" />
                <span className="text-lg font-serif font-bold gradient-text">TravelLux</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Премиальное туристическое агентство в Алматы. Подбор туров мечты с 2015 года.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Направления</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/turkey-from-almaty" className="hover:text-primary transition-colors">Турция из Алматы</Link>
                <Link to="/dubai-tours" className="hover:text-primary transition-colors">Туры в Дубай</Link>
                <Link to="/hot-tours" className="hover:text-primary transition-colors">Горящие туры</Link>
                <Link to="/sharm-el-sheikh" className="hover:text-primary transition-colors">Шарм-эль-Шейх</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Компания</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/about" className="hover:text-primary transition-colors">О нас</Link>
                <Link to="/contacts" className="hover:text-primary transition-colors">Контакты</Link>
                <Link to="/tours" className="hover:text-primary transition-colors">Все туры</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Контакты</h4>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <a href="tel:+77001234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone size={14} /> +7 700 123 45 67
                </a>
                <a href="mailto:info@travellux.kz" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail size={14} /> info@travellux.kz
                </a>
                <span className="flex items-center gap-2">
                  <MapPin size={14} /> Алматы, ул. Абая 150
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-12 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TravelLux. Все права защищены.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
