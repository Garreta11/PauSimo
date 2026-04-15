import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const languages = [
    { code: 'en' as const, label: 'EN' },
    { code: 'ca' as const, label: 'CA' },
    { code: 'es' as const, label: 'ES' },
    { code: 'fr' as const, label: 'FR' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanguageSelect = (code: typeof language) => {
    setLanguage(code);
    setMenuOpen(false);
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

        {/* Desktop: inline language switcher */}
        <div className="hidden sm:flex items-center">
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

        {/* Mobile: burger menu */}
        <div className="relative sm:hidden">
          <motion.button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative flex flex-col justify-center items-center w-10 h-10 cursor-pointer rounded-full"
            animate={{ backgroundColor: menuOpen ? '#f1f5f9' : 'rgba(0,0,0,0)' }}
            transition={{ duration: 0.25 }}
            aria-label="Toggle language menu"
          >
            {/* Top bar */}
            <motion.span
              className="absolute block h-[1.5px] bg-slate-700 rounded-full origin-center"
              animate={
                menuOpen
                  ? { width: 20, rotate: 45, y: 0 }
                  : { width: 20, rotate: 0, y: -5 }
              }
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
            {/* Middle bar */}
            <motion.span
              className="absolute block h-[1.5px] bg-slate-700 rounded-full origin-center"
              animate={
                menuOpen
                  ? { width: 0, opacity: 0 }
                  : { width: 14, opacity: 1 }
              }
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
            {/* Bottom bar */}
            <motion.span
              className="absolute block h-[1.5px] bg-slate-700 rounded-full origin-center"
              animate={
                menuOpen
                  ? { width: 20, rotate: -45, y: 0 }
                  : { width: 20, rotate: 0, y: 5 }
              }
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="absolute right-0 top-[calc(100%+8px)] w-36 bg-white rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(226,232,240,0.8)',
                }}
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="py-1.5">
                  {languages.map((lang, index) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`flex items-center justify-between w-full px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                        language === lang.code
                          ? 'text-slate-900 font-semibold'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                      }`}
                      style={{ fontFamily: 'Playfair Display, serif' }}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, delay: index * 0.04, ease: 'easeOut' }}
                    >
                      <span>{lang.label}</span>
                      {language === lang.code && (
                        <motion.span
                          className="inline-block w-1.5 h-1.5 rounded-full bg-[#efc868]"
                          layoutId="activeLangDot"
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}