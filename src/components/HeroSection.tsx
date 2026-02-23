import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();
  
  const tags = [
    t('hero.tag1'),
    t('hero.tag2'),
    t('hero.tag3')
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-slate-500">{t('hero.subtitle')}</p>
              <h1 className="text-6xl lg:text-7xl leading-[1.1] font-playfair" style={{fontFamily: 'Playfair Display, serif'}}>
                {t('hero.title')}
              </h1>
            </motion.div>
            
            <motion.div 
              className="space-y-6 pt-8 border-t border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg tracking-wide">
                {t('hero.languages')} <span className="text-slate-400 mx-2">{t('hero.arrow')}</span> {t('hero.target')}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {tags.map((tag, index) => (
                  <motion.span 
                    key={index}
                    className="px-4 py-2 border border-slate-900 text-sm hover:bg-slate-900 hover:text-white transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                {t('hero.description')}
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-full max-w-md">
              <motion.div 
                className="absolute -inset-4 bg-slate-900 opacity-5"
                initial={{ rotate: 0 }}
                animate={{ rotate: 3 }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
              <img src="/pau.jpg" alt="Pau Simó - Translation Consultant" className="relative w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
