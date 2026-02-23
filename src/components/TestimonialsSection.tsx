import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function TestimonialsSection() {
  const { t } = useLanguage();
  
  const testimonials = [1, 2, 3].map(num => ({
    quote: t(`testimonial.${num}.quote`),
    author: t(`testimonial.${num}.author`),
    role: t(`testimonial.${num}.role`),
    company: t(`testimonial.${num}.company`)
  }));

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-slate-500 mb-6">{t('testimonials.subtitle')}</p>
          <h2 className="text-5xl lg:text-6xl leading-[1.1]" style={{fontFamily: 'Playfair Display, serif'}}>
            {t('testimonials.title')}
          </h2>
        </motion.div>
        
        <div className="space-y-16">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="border-l-2 border-slate-900 pl-12 transition-all"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="max-w-3xl">
                <p className="text-xl text-slate-700 leading-relaxed mb-8 italic" style={{fontFamily: 'Playfair Display, serif'}}>
                  "{testimonial.quote}"
                </p>
                
                <div className="space-y-1">
                  <p className="text-base">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.role} · {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
