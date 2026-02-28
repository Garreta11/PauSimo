import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [1, 2, 3].map(num => ({
    quote: t(`testimonial.${num}.quote`),
    author: t(`testimonial.${num}.author`),
    role: t(`testimonial.${num}.role`),
    company: t(`testimonial.${num}.company`),
  }));

  return (
    <section className="py-32 px-6 overflow-hidden bg-[#fdf8ed]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-24"

          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase text-slate-400 mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {t('testimonials.subtitle')}
          </p>
          <h2
            className="text-5xl lg:text-6xl leading-[1.1] text-slate-900"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
          >
            {t('testimonials.title')}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: '#e8c84e' }}>
          {testimonials.map((testimonial, index) => {
            const initials = testimonial.author
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <motion.div
                key={index}
                className="group relative p-10 flex flex-col" style={{ background: '#fdf8ed' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Top accent line — animates on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background: '#efc868' }}
                />

                {/* Issue number */}
                <span
                  className="text-[56px] leading-none text-[#efc868] select-none mb-6 -ml-1"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Oversized quote mark */}
                <span
                  className="text-6xl leading-none text-slate-300 select-none pointer-events-none -mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  aria-hidden="true"
                >
                  "
                </span>

                {/* Quote */}
                <blockquote
                  className="flex-1 text-lg leading-[1.7] text-slate-700 italic mb-10"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
                >
                  {testimonial.quote}
                </blockquote>

                {/* Divider */}
                <div className="w-8 h-px bg-slate-400 mb-6" />

                {/* Author row */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium text-slate-600 border border-slate-300 bg-white"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p
                      className="text-sm text-slate-900"
                      style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}
                    >
                      {testimonial.author}
                    </p>
                    <p className="text-xs tracking-[0.15em] uppercase text-slate-400 mt-0.5">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}