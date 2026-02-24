import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const Contacts = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Заявка с сайта:\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nСообщение: ${formData.message}`;
    window.open(`https://wa.me/77001234567?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <Layout>
      <section className="pt-28 pb-20 container mx-auto px-6">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">Контакты</h1>
          <p className="text-muted-foreground mb-12">Свяжитесь с нами любым удобным способом</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
          {/* Form */}
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 space-y-5">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Оставить заявку</h2>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Имя</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-muted/40 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-primary/20 transition-all text-foreground"
                  placeholder="Ваше имя"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Телефон</label>
                <input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-muted/40 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-primary/20 transition-all text-foreground"
                  placeholder="+7 700 123 45 67"
                  maxLength={20}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Сообщение</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-muted/40 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-primary/20 transition-all text-foreground h-28 resize-none"
                  placeholder="Расскажите о вашем идеальном путешествии"
                  maxLength={1000}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary-glow flex items-center justify-center gap-2"
              >
                <Send size={16} /> Отправить в WhatsApp
              </motion.button>
            </form>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-5">
              {[
                { icon: Phone, title: "Телефон", value: "+7 700 123 45 67", href: "tel:+77001234567" },
                { icon: MessageCircle, title: "WhatsApp", value: "Написать сейчас", href: "https://wa.me/77001234567" },
                { icon: Mail, title: "Email", value: "info@travellux.kz", href: "mailto:info@travellux.kz" },
                { icon: MapPin, title: "Адрес", value: "Алматы, ул. Абая 150, офис 12", href: "#" },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-4 glass-strong rounded-2xl p-5 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center glow-ring">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.title}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </motion.a>
              ))}

              {/* Map placeholder */}
              <AnimatedSection delay={0.3}>
                <div className="glass-strong rounded-3xl overflow-hidden h-52">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.544!2d76.9286!3d43.2381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE0JzE3LjIiTiA3NsKwNTUnNDMuMCJF!5e0!3m2!1sru!2skz!4v1234"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Карта офиса TravelLux"
                  />
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
