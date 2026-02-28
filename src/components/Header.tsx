import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as const, label: 'EN' },
    { code: 'ca' as const, label: 'CA' },
    { code: 'es' as const, label: 'ES' }
  ];

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
          <span className="text-2xl tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Pau Simó Parés
          </span>
        </motion.button>

        {/* Inline language switcher */}
        <div className="flex items-center">
          {languages.map((lang, index) => (
            <div key={lang.code} className="flex items-center">
              <button
                onClick={() => setLanguage(lang.code)}
                className={`text-sm px-1 py-0.5 transition-colors relative cursor-pointer ${
                  language === lang.code
                    ? 'text-slate-900 font-medium'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {lang.label}
                {language === lang.code && (
                  <motion.div
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#efc868]"
                    layoutId="activeLang"
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                )}
              </button>
              {index < languages.length - 1 && (
                <span className="text-slate-300 text-xs mx-2 select-none">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.header>
  );
}