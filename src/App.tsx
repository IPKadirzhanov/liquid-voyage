import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import TurkeyFromAlmaty from "./pages/TurkeyFromAlmaty";
import DubaiTours from "./pages/DubaiTours";
import HotTours from "./pages/HotTours";
import SharmElSheikh from "./pages/SharmElSheikh";
import Admin from "./pages/Admin";
import TourPage from "./pages/TourPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/turkey-from-almaty" element={<TurkeyFromAlmaty />} />
            <Route path="/dubai-tours" element={<DubaiTours />} />
            <Route path="/hot-tours" element={<HotTours />} />
            <Route path="/sharm-el-sheikh" element={<SharmElSheikh />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/tour/:slug" element={<TourPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
