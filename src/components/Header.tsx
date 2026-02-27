import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = [
    { code: 'en' as const, label: 'English' },
    { code: 'ca' as const, label: 'Català' },
    { code: 'es' as const, label: 'Español' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.button 
          onClick={scrollToTop}
          className="flex items-center gap-4 hover:opacity-70 transition-opacity group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-auto flex items-center justify-center">
            <img src="/logo.png" alt="Pau Simó Parés" className="w-10 h-auto" />
          </div>
          <span className="text-2xl tracking-tight" style={{fontFamily: 'Playfair Display, serif'}}>
            Pau Simó Parés
          </span>
        </motion.button>
        
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-900 hover:bg-slate-900 hover:text-white transition-colors text-sm"
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
          >
            <span>{currentLanguage?.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <motion.div 
              className="absolute top-full right-0 mt-2 bg-white border border-slate-900 shadow-lg min-w-[140px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-900 hover:text-white transition-colors ${
                    language === lang.code ? 'bg-slate-100' : ''
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
