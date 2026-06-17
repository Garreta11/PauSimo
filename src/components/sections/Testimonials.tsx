"use client";

import { motion } from "motion/react";
import { RichText } from "@/components/RichText";
import type { RichTextValue } from "@/lib/types";

interface Testimonial {
  quote: RichTextValue;
  person: string;
  job?: string;
}

interface TestimonialsProps {
  description?: string;
  testimonials?: Testimonial[];
}

export function Testimonials({ description, testimonials }: TestimonialsProps) {
  if (!description && !testimonials?.length) return null;

  return (
    <section id="testimonials" className="bg-slate-900 text-white px-6 md:px-12 lg:px-24 py-32">
      <div className="max-w-7xl mx-auto">

        {description && (
          <motion.p
            className="font-mono text-xs tracking-[0.3em] uppercase text-[#efc868] mb-16"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            — {description}
          </motion.p>
        )}

        {testimonials && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {testimonials.map((t, i) => (
              <motion.figure
                key={i}
                className="bg-slate-900 p-8 md:p-10 flex flex-col justify-between gap-10 hover:bg-slate-800 transition-colors duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Decorative mark + quote */}
                <div className="relative">
                  <span
                    className="font-serif block text-5xl text-[#efc868] leading-none select-none mb-4 opacity-70"
                    style={{ fontFamily: "Playfair Display, serif" }}
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <blockquote style={{ fontFamily: "Playfair Display, serif" }}>
                    <RichText
                      value={t.quote}
                      paragraphClass="font-serif text-lg md:text-xl text-white font-normal leading-[1.4] mb-2 last:mb-0"
                    />
                  </blockquote>
                </div>

                {/* Attribution */}
                <figcaption className="flex flex-col gap-1 pt-6 border-t border-white/10">
                  <span className="font-mono text-sm font-bold text-white tracking-wide">
                    {t.person}
                  </span>
                  {t.job && (
                    <span className="font-mono text-xs text-slate-400 tracking-wide">
                      {t.job}
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
