import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function ServicesSection() {
  const { t } = useLanguage();
  
  const services = [1, 2, 3, 4, 5].map(num => ({
    title: t(`services.${num}.title`),
    description: t(`services.${num}.description`)
  }));

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-slate-500 mb-6">{t('services.subtitle')}</p>
            <h2 className="text-5xl leading-[1.1]" style={{fontFamily: 'Playfair Display, serif'}}>
              {t('services.title')}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mt-8">
              {t('services.intro')}
            </p>
          </motion.div>
          
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-sm tracking-[0.2em] uppercase mb-10 text-slate-900">
                {t('services.heading')}
              </h3>
            </motion.div>
            
            <div className="space-y-8">
              {services.map((service, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-6 items-start group cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-4xl text-slate-200 group-hover:text-slate-900 transition-colors mt-[-8px]" style={{fontFamily: 'Playfair Display, serif'}}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 pt-2">
                    <h4 className="text-xl mb-2" style={{fontFamily: 'Playfair Display, serif'}}>{service.title}</h4>
                    <p className="text-base text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
