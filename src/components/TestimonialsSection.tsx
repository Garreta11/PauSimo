import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [1, 2, 3].map(num => ({
    description: t(`testimonial.${num}.description`),
    quote: t(`testimonial.${num}.quote`),
    author: t(`testimonial.${num}.author`),
    role: t(`testimonial.${num}.role`),
    company: t(`testimonial.${num}.company`),
    link: t(`testimonial.${num}.link`),
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

        {/* Rows */}
        <div className="flex flex-col divide-y" style={{ borderColor: '#e8c84e' }}>
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
                className="group relative py-12 px-2 grid grid-cols-1 lg:grid-cols-[3rem_1fr_1fr] gap-x-12 gap-y-6 items-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Left accent line — animates on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
                  style={{ background: '#efc868' }}
                />

                {/* Number */}
                <span
                  className="text-[40px] leading-none text-[#efc868] select-none pt-1"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Work description */}
                <p
                  className="text-sm leading-relaxed text-slate-500"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
                >
                  {testimonial.description}
                </p>

                {/* Quote + author */}
                <div className="flex flex-col gap-6">
                  <div>
                    <span
                      className="text-4xl leading-none text-slate-300 select-none pointer-events-none block -mb-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                      aria-hidden="true"
                    >
                      "
                    </span>
                    <blockquote
                      className="text-base leading-[1.7] text-slate-600 italic"
                      style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
                    >
                      {testimonial.quote}
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-4 pt-2 border-t border-slate-200">
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-slate-600 border border-slate-300 bg-white"
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
                      <a href={testimonial.link} target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.15em] uppercase text-slate-400 mt-0.5 hover:text-slate-600 transition-colors">
                        {testimonial.role} · <span className="underline">{testimonial.company}</span>
                      </a>
                    </div>
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