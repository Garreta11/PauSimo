import { HeroSection } from './components/HeroSection';
import { ValuePropositionSection } from './components/ValuePropositionSection';
import { ServicesSection } from './components/ServicesSection';
import { PartnershipSection } from './components/PartnershipSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';

import { Header } from './components/Header';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="w-full">
        <Header />
        <div className="pt-[73px]">
          <HeroSection />
          <ValuePropositionSection />
          <ServicesSection />
          <PartnershipSection />
          <TestimonialsSection />
          <ContactSection />
        </div>
      </div>
    </LanguageProvider>
  );
}