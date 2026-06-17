"use client";

import { motion } from "motion/react";
import { RichText } from "@/components/RichText";
import type { RichTextValue } from "@/lib/types";

interface Bullet { text: string }

interface Area {
  title?: string;
  description?: RichTextValue;
  bulletPoints?: Bullet[];
  subtext?: string;
}

interface MainAreasProps {
  subheader?: string;
  description?: RichTextValue;
  areas?: Area[];
}

export function MainAreas({ subheader, description, areas }: MainAreasProps) {
  if (!subheader && !description && !areas?.length) return null;

  return (
    <section id="areas" className="bg-white px-6 md:px-12 lg:px-24 py-32">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-24 pb-12 border-b border-slate-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {subheader && (
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-slate-500 mb-4">
                — {subheader}
              </p>
            )}
            {description && (
              <div style={{ fontFamily: "Playfair Display, serif" }}>
                <RichText
                  value={description}
                  paragraphClass="font-serif text-4xl md:text-5xl leading-[1.1] font-normal mb-3 last:mb-0"
                />
              </div>
            )}
          </motion.div>
        </div>

        {/* Areas — editorial vertical rows */}
        {areas && areas.length > 0 && (
          <div className="space-y-0">
            {areas.map((area, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-[48px_1fr_1fr] items-start border-b border-slate-100 py-14 first:pt-0 last:border-b-0"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.1 }}
              >
                {/* Number */}
                <span className="font-mono text-xs tracking-widest text-[#efc868] select-none tabular-nums pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title + description */}
                <div>
                  {area.title && (
                    <h3
                      className="font-serif text-2xl md:text-3xl font-normal mb-4 leading-tight"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {area.title}
                    </h3>
                  )}
                  {area.description && (
                    <RichText
                      value={area.description}
                      paragraphClass="font-mono text-sm tracking-wide text-slate-500 leading-relaxed uppercase mb-2 last:mb-0"
                    />
                  )}
                  {area.subtext && (
                    <p className="font-mono text-xs text-[#efc868] mt-4 tracking-wide">
                      {area.subtext}
                    </p>
                  )}
                </div>

                {/* Bullet points */}
                {area.bulletPoints && area.bulletPoints.length > 0 && (
                  <ul className="space-y-3 pt-1">
                    {area.bulletPoints.map((b, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <span className="mt-2 w-1 h-1 bg-[#efc868] shrink-0" />
                        <span className="font-mono text-base text-slate-700 leading-relaxed">
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
