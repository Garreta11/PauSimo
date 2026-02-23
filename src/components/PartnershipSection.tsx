import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function PartnershipSection() {
  const { t } = useLanguage();
  
  const benefits = [1, 2, 3, 4].map(num => ({
    title: t(`partnership.${num}.title`),
    description: t(`partnership.${num}.description`)
  }));
  
  const detailedServices = [1, 2, 3, 4, 5].map(num => ({
    title: t(`partnership.detail${num}.title`),
    description: t(`partnership.detail${num}.description`)
  }));

  return (
    <section className="py-32 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-slate-500 mb-6">{t('partnership.subtitle')}</p>
          <h2 className="text-5xl lg:text-6xl leading-[1.1] max-w-4xl mx-auto" style={{fontFamily: 'Playfair Display, serif'}}>
            {t('partnership.title')}
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-px bg-slate-900 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-12 transition-all group cursor-default"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-5xl text-slate-200 group-hover:text-slate-900 transition-colors" style={{fontFamily: 'Playfair Display, serif'}}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl mb-3" style={{fontFamily: 'Playfair Display, serif'}}>{benefit.title}</h3>
                  <p className="text-sm text-slate-600 transition-colors leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xs tracking-[0.3em] uppercase text-slate-500 mb-12 text-center">
              {t('partnership.portfolioTitle')}
            </h3>
          </motion.div>
          
          <div className="space-y-0 border-t border-slate-900">
            {detailedServices.map((service, index) => (
              <motion.div 
                key={index} 
                className="border-b border-slate-200 py-8 hover:bg-white transition-colors px-8 cursor-default"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start gap-8">
                  <span className="text-3xl text-slate-300 mt-[-4px]" style={{fontFamily: 'Playfair Display, serif'}}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-2xl mb-2" style={{fontFamily: 'Playfair Display, serif'}}>{service.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
