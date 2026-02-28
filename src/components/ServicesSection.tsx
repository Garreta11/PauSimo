import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const bulletsByIndex = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4],
];

function ServiceCard({
  service,
  index,
  bullets,
  sentence,
}: {
  service: { title: string; description: string };
  index: number;
  bullets: string[];
  sentence: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative py-12 group"
    >
      {/* Animated top rule */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-slate-900 origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="grid grid-cols-[80px_1fr] gap-8 items-start">
        {/* Number */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          className="pt-1"
        >
          <span
            className="text-3xl tracking-[0.15em] text-[#efc868] transition-colors duration-300"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col gap-7">
          <motion.h4
            className="text-3xl md:text-4xl font-normal text-slate-900 leading-tight tracking-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.25 }}
          >
            {service.title}
          </motion.h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.p
              className="text-base text-slate-500 leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.35 }}
            >
              {service.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.45 }}
            >
              <ul className="flex flex-col gap-2 mb-5">
                {bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-500 leading-relaxed">
                    <span className="text-slate-300 group-hover:text-slate-400 transition-colors duration-300 shrink-0 select-none">
                      —
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-400 italic leading-relaxed">
                {sentence}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ServicesSection() {
  const { t } = useLanguage();

  const services = [1, 2, 3].map((num) => ({
    title: t(`services.${num}.title`),
    description: t(`services.${num}.description`),
  }));

  const allBullets = bulletsByIndex.map((nums, i) =>
    nums.map((num) => t(`services.${i + 1}.bullet${num}`))
  );

  const sentences = [1, 2, 3].map((num) => t(`services.${num}.sentence`));

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section className="relative py-32 px-6 bg-white overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="flex items-center gap-5 mb-16">
          <motion.h3
            className="text-xs tracking-[0.25em] uppercase text-slate-400 font-normal"
            initial={{ opacity: 0, x: -8 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('services.heading')}
          </motion.h3>
        </div>

        {/* Services list */}
        <div>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              bullets={allBullets[index]}
              sentence={sentences[index]}
            />
          ))}
        </div>

        {/* Bottom rule */}
        <div className="h-px bg-slate-900" />
      </div>
    </section>
  );
}