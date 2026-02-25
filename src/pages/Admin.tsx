import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, Eye, EyeOff, Flame, Link as LinkIcon, Loader2, Check, X, ExternalLink, Search, Users } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";

interface TourRow {
  id: string;
  title: string;
  location: string;
  destination: string | null;
  price: string;
  dates: string;
  rating: number | null;
  tag: string | null;
  image_url: string | null;
  description: string | null;
  status: string;
  slug: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string | null;
}

interface ContactRow {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  source: string | null;
  created_at: string | null;
}

interface ImportedTour {
  title: string;
  location: string;
  destination: string;
  price: string;
  dates: string;
  rating: number;
  tag: string;
  image_url: string;
  description: string;
  slug: string;
  seo_title: string;
  seo_description: string;
  source_url: string;
  status: string;
}

const IMPORT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/import-tour`;

const statusConfig: Record<string, { label: string; icon: typeof Eye; color: string }> = {
  active: { label: "Активный", icon: Eye, color: "text-accent" },
  hidden: { label: "Скрыт", icon: EyeOff, color: "text-muted-foreground" },
  hot: { label: "Горящий", icon: Flame, color: "text-destructive" },
};

const Admin = () => {
  const [tab, setTab] = useState<"tours" | "import" | "contacts">("tours");
  const [tours, setTours] = useState<TourRow[]>([]);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Import state
  const [importUrl, setImportUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState<string[]>([]);
  const [preview, setPreview] = useState<ImportedTour | null>(null);
  const [editingPreview, setEditingPreview] = useState<ImportedTour | null>(null);
  const [publishing, setPublishing] = useState(false);

  // Edit state
  const [editingTour, setEditingTour] = useState<TourRow | null>(null);

  useEffect(() => {
    fetchTours();
    fetchContacts();
  }, []);

  const fetchTours = async () => {
    setLoading(true);
    const { data } = await supabase.from("tours").select("*").order("created_at", { ascending: false });
    setTours((data as TourRow[]) || []);
    setLoading(false);
  };

  const fetchContacts = async () => {
    const { data } = await supabase.from("contact_requests").select("*").order("created_at", { ascending: false });
    setContacts((data as ContactRow[]) || []);
  };

  const handleImport = async () => {
    if (!importUrl.trim()) return;
    setImporting(true);
    setPreview(null);
    setImportProgress(["🔗 Подключение к странице..."]);

    try {
      await new Promise((r) => setTimeout(r, 800));
      setImportProgress((p) => [...p, "📄 Извлечение контента..."]);

      const resp = await fetch(IMPORT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ url: importUrl }),
      });

      setImportProgress((p) => [...p, "🤖 AI анализирует данные..."]);
      await new Promise((r) => setTimeout(r, 500));

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || "Import failed");
      }

      const data = await resp.json();

      if (data.success && data.tour) {
        setImportProgress((p) => [...p, "✅ Данные извлечены!"]);
        setPreview(data.tour);
        setEditingPreview(data.tour);
      } else {
        throw new Error("No tour data returned");
      }
    } catch (e: any) {
      setImportProgress((p) => [...p, `❌ Ошибка: ${e.message}`]);
    } finally {
      setImporting(false);
    }
  };

  const handlePublish = async () => {
    if (!editingPreview) return;
    setPublishing(true);
    try {
      const { error } = await supabase.from("tours").insert({
        title: editingPreview.title,
        location: editingPreview.location,
        destination: editingPreview.destination,
        price: editingPreview.price,
        dates: editingPreview.dates,
        rating: editingPreview.rating,
        tag: editingPreview.tag || null,
        image_url: editingPreview.image_url || null,
        description: editingPreview.description,
        slug: editingPreview.slug,
        seo_title: editingPreview.seo_title,
        seo_description: editingPreview.seo_description,
        status: editingPreview.status,
      });

      if (error) throw error;

      setPreview(null);
      setEditingPreview(null);
      setImportUrl("");
      setImportProgress([]);
      fetchTours();
      setTab("tours");
    } catch (e: any) {
      alert("Ошибка публикации: " + e.message);
    } finally {
      setPublishing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить тур?")) return;
    await supabase.from("tours").delete().eq("id", id);
    fetchTours();
  };

  const handleStatusChange = async (id: string, status: string) => {
    await supabase.from("tours").update({ status }).eq("id", id);
    fetchTours();
  };

  const handleSaveEdit = async () => {
    if (!editingTour) return;
    const { id, created_at, ...rest } = editingTour;
    await supabase.from("tours").update(rest).eq("id", id);
    setEditingTour(null);
    fetchTours();
  };

  return (
    <Layout>
      <section className="pt-28 pb-20 container mx-auto px-6">
        <AnimatedSection>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Админ-панель</h1>
          <p className="text-muted-foreground mb-8">Управление турами и заявками</p>
        </AnimatedSection>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: "tours" as const, label: "Туры", icon: Eye },
            { key: "import" as const, label: "Импорт тура", icon: Plus },
            { key: "contacts" as const, label: "Заявки", icon: Users },
          ].map((t) => (
            <motion.button
              key={t.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
                tab === t.key ? "btn-primary-glow !py-3" : "glass hover:bg-muted/50"
              }`}
            >
              <t.icon size={16} />
              {t.label}
              {t.key === "contacts" && contacts.length > 0 && (
                <span className="bg-destructive text-destructive-foreground text-xs rounded-full px-2 py-0.5">
                  {contacts.length}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Tours list */}
        <AnimatePresence mode="wait">
          {tab === "tours" && (
            <motion.div key="tours" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : tours.length === 0 ? (
                <div className="glass-strong rounded-3xl p-12 text-center">
                  <p className="text-muted-foreground mb-4">Нет туров. Импортируйте первый тур!</p>
                  <motion.button whileHover={{ scale: 1.05 }} onClick={() => setTab("import")} className="btn-primary-glow">
                    <Plus size={16} className="inline mr-2" /> Импортировать тур
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-3">
                  {tours.map((tour, i) => {
                    const sc = statusConfig[tour.status] || statusConfig.active;
                    return (
                      <motion.div
                        key={tour.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-strong rounded-2xl p-4 flex items-center gap-4 group"
                      >
                        {tour.image_url && (
                          <img
                            src={tour.image_url}
                            alt={tour.title}
                            className="w-20 h-16 rounded-xl object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground truncate">{tour.title}</h3>
                            {tour.tag && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tour.tag}</span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {tour.location} · {tour.price} · {tour.dates}
                          </p>
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${sc.color}`}>
                          <sc.icon size={14} />
                          {sc.label}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <select
                            value={tour.status}
                            onChange={(e) => handleStatusChange(tour.id, e.target.value)}
                            className="bg-muted/50 rounded-lg px-2 py-1 text-xs outline-none"
                          >
                            <option value="active">Активный</option>
                            <option value="hidden">Скрыт</option>
                            <option value="hot">Горящий</option>
                          </select>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setEditingTour(tour)}
                            className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                          >
                            <Edit3 size={14} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => handleDelete(tour.id)}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 size={14} />
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {tab === "import" && (
            <motion.div key="import" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="glass-strong rounded-3xl p-8">
                <h2 className="text-xl font-serif font-bold text-foreground mb-2">Добавить тур по ссылке</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Вставьте ссылку на Booking, туроператора или отель — AI извлечёт все данные
                </p>

                <div className="flex gap-3 mb-6">
                  <div className="flex-1 flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-3">
                    <LinkIcon className="h-5 w-5 text-primary flex-shrink-0" />
                    <input
                      value={importUrl}
                      onChange={(e) => setImportUrl(e.target.value)}
                      placeholder="https://booking.com/hotel/..."
                      className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
                      disabled={importing}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleImport}
                    disabled={importing || !importUrl.trim()}
                    className="btn-primary-glow flex items-center gap-2 disabled:opacity-50"
                  >
                    {importing ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                    Импортировать
                  </motion.button>
                </div>

                {/* Progress animation */}
                <AnimatePresence>
                  {importProgress.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 space-y-2">
                      {importProgress.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-center gap-2 text-sm"
                        >
                          {importing && i === importProgress.length - 1 ? (
                            <Loader2 size={14} className="animate-spin text-primary" />
                          ) : (
                            <Check size={14} className="text-accent" />
                          )}
                          <span className="text-muted-foreground">{step}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Preview card */}
                {editingPreview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-2xl p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-lg text-foreground">Предпросмотр тура</h3>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setPreview(null); setEditingPreview(null); setImportProgress([]); }}
                          className="btn-glass !py-2 !px-4 text-sm flex items-center gap-1"
                        >
                          <X size={14} /> Отмена
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePublish}
                          disabled={publishing}
                          className="btn-primary-glow !py-2 !px-4 text-sm flex items-center gap-1"
                        >
                          {publishing ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                          Опубликовать
                        </motion.button>
                      </div>
                    </div>

                    {editingPreview.image_url && (
                      <img src={editingPreview.image_url} alt="" className="w-full h-48 object-cover rounded-xl" />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Название", key: "title" },
                        { label: "Локация", key: "location" },
                        { label: "Направление", key: "destination" },
                        { label: "Цена", key: "price" },
                        { label: "Длительность", key: "dates" },
                        { label: "Тег", key: "tag" },
                        { label: "Рейтинг", key: "rating" },
                        { label: "Slug", key: "slug" },
                      ].map(({ label, key }) => (
                        <div key={key}>
                          <label className="text-xs text-muted-foreground">{label}</label>
                          <input
                            value={(editingPreview as any)[key] || ""}
                            onChange={(e) => setEditingPreview({ ...editingPreview, [key]: e.target.value })}
                            className="w-full bg-muted/40 rounded-lg px-3 py-2 text-sm outline-none text-foreground focus:ring-2 ring-primary/20"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground">Описание</label>
                      <textarea
                        value={editingPreview.description || ""}
                        onChange={(e) => setEditingPreview({ ...editingPreview, description: e.target.value })}
                        rows={3}
                        className="w-full bg-muted/40 rounded-lg px-3 py-2 text-sm outline-none text-foreground focus:ring-2 ring-primary/20 resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground">URL изображения</label>
                        <input
                          value={editingPreview.image_url || ""}
                          onChange={(e) => setEditingPreview({ ...editingPreview, image_url: e.target.value })}
                          className="w-full bg-muted/40 rounded-lg px-3 py-2 text-sm outline-none text-foreground focus:ring-2 ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Статус</label>
                        <select
                          value={editingPreview.status}
                          onChange={(e) => setEditingPreview({ ...editingPreview, status: e.target.value })}
                          className="w-full bg-muted/40 rounded-lg px-3 py-2 text-sm outline-none text-foreground"
                        >
                          <option value="active">Активный</option>
                          <option value="hidden">Скрыт</option>
                          <option value="hot">Горящий</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {tab === "contacts" && (
            <motion.div key="contacts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {contacts.length === 0 ? (
                <div className="glass-strong rounded-3xl p-12 text-center">
                  <p className="text-muted-foreground">Нет заявок</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {contacts.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass-strong rounded-2xl p-5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{c.name}</h3>
                          <a href={`tel:${c.phone}`} className="text-sm text-primary hover:underline">{c.phone}</a>
                          {c.message && <p className="text-sm text-muted-foreground mt-2">{c.message}</p>}
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">
                            {c.created_at ? new Date(c.created_at).toLocaleDateString("ru-RU") : ""}
                          </span>
                          {c.source && (
                            <span className="block text-xs text-muted-foreground mt-1">{c.source}</span>
                          )}
                          <a
                            href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-2 text-xs text-accent hover:underline"
                          >
                            <ExternalLink size={12} /> WhatsApp
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit modal */}
        <AnimatePresence>
          {editingTour && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-6"
              onClick={() => setEditingTour(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="glass-strong rounded-3xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-serif text-xl font-bold text-foreground mb-6">Редактировать тур</h3>
                <div className="space-y-4">
                  {[
                    { label: "Название", key: "title" },
                    { label: "Локация", key: "location" },
                    { label: "Направление", key: "destination" },
                    { label: "Цена", key: "price" },
                    { label: "Длительность", key: "dates" },
                    { label: "Тег", key: "tag" },
                    { label: "Рейтинг", key: "rating" },
                    { label: "URL изображения", key: "image_url" },
                    { label: "Slug", key: "slug" },
                    { label: "SEO Title", key: "seo_title" },
                    { label: "SEO Description", key: "seo_description" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="text-xs text-muted-foreground">{label}</label>
                      <input
                        value={(editingTour as any)[key] || ""}
                        onChange={(e) => setEditingTour({ ...editingTour, [key]: e.target.value })}
                        className="w-full bg-muted/40 rounded-lg px-3 py-2 text-sm outline-none text-foreground focus:ring-2 ring-primary/20"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-muted-foreground">Описание</label>
                    <textarea
                      value={editingTour.description || ""}
                      onChange={(e) => setEditingTour({ ...editingTour, description: e.target.value })}
                      rows={3}
                      className="w-full bg-muted/40 rounded-lg px-3 py-2 text-sm outline-none text-foreground focus:ring-2 ring-primary/20 resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <motion.button whileHover={{ scale: 1.05 }} onClick={() => setEditingTour(null)} className="btn-glass !py-2 !px-5 text-sm">
                    Отмена
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} onClick={handleSaveEdit} className="btn-primary-glow !py-2 !px-5 text-sm">
                    Сохранить
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </Layout>
  );
};

export default Admin;
