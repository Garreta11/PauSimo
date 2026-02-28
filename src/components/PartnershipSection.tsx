import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function PartnershipSection() {
  const { t } = useLanguage();

  const benefits = [1, 2, 3].map(num => ({
    title: t(`partnership.${num}.title`),
    description: t(`partnership.${num}.description`)
  }));

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-left mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-slate-400 mb-6">
            {t('partnership.subtitle')}
          </p>
          <h2
            className="text-5xl lg:text-6xl leading-[1.1] text-slate-900"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {t('partnership.title')}
          </h2>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-3 gap-px bg-slate-900 mb-24">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-12 group cursor-default overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Yellow fill on hover */}
              <div
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                style={{ background: '#efc868' }}
              />

              <div className="relative z-10 flex items-start gap-4">
                <span
                  className="text-5xl leading-none select-none transition-colors duration-500"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    color: '#efc868',
                  }}
                  // on hover the card bg becomes yellow, so number shifts to white
                >
                  <span className="group-hover:text-white transition-colors duration-500 block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </span>
                <div className="flex-1 pt-1">
                  <h3
                    className="text-xl text-slate-900 group-hover:text-slate-900 transition-colors duration-500"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {benefit.title}
                  </h3>
                </div>
              </div>

              {/* Bottom accent line — visible at rest, hides on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] transition-opacity duration-500 group-hover:opacity-0"
                style={{ background: '#efc868' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Portfolio title */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-6 justify-center">
              <div className="h-px flex-1 max-w-[80px]" style={{ background: '#efc868' }} />
              <h3 className="text-xs tracking-[0.3em] uppercase text-slate-500 text-center">
                {t('partnership.portfolioTitle')}
              </h3>
              <div className="h-px flex-1 max-w-[80px]" style={{ background: '#efc868' }} />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}