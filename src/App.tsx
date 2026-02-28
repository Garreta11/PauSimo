import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { HeroSection } from './components/HeroSection';
import { ValuePropositionSection } from './components/ValuePropositionSection';
import { ServicesSection } from './components/ServicesSection';
import { PartnershipSection } from './components/PartnershipSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { CarouselSection } from './components/CarouselSection';
import { Header } from './components/Header';
import { LanguageProvider } from './contexts/LanguageContext';

function MainLayout() {
  return (
    <div className="w-full">
      <Header />
      <div>
        <HeroSection />
        <ValuePropositionSection />
        <ServicesSection />
        <CarouselSection />
        <PartnershipSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/"    element={<MainLayout />} /> {/* English */}
        <Route path="/cat" element={<MainLayout />} /> {/* Catalan */}
        <Route path="/es"  element={<MainLayout />} /> {/* Spanish */}
        {/* Fallback → English */}
        <Route path="*"    element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}