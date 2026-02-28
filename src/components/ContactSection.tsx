import { motion } from 'motion/react';
import { Mail, Linkedin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 px-6 bg-[#efc868] text-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-slate-400 mb-6">{t('contact.subtitle')}</p>
            <h2 className="text-6xl text-slate-900 lg:text-7xl leading-[1.1] mb-8" style={{fontFamily: 'Playfair Display, serif'}}>
              {t('contact.title')}
            </h2>
            <p className="text-base text-slate-900 leading-relaxed max-w-md">
              {t('contact.description')}
            </p>
          </motion.div>
          
          <motion.div 
            className="space-y-8 pt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <motion.a 
                href="mailto:contact@pausimo.com" 
                className="flex items-center justify-between gap-4 text-lg text-slate-900 hover:text-slate-700 transition-colors group py-3 border-b border-slate-700"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5" />
                  <span>psimop@gmail.com</span>
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              
              <motion.a 
                href="https://www.linkedin.com/in/pausimpar/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 text-lg text-slate-900 hover:text-slate-700 transition-colors group py-3 border-b border-slate-700"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-4">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            </div>
            
            <div className="pt-0">
              <p className="text-xs tracking-[0.2em] uppercase text-slate-500">
                {t('contact.rights')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
