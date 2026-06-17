"use client";

import { motion } from "motion/react";
import { RichText } from "@/components/RichText";
import type { RichTextValue } from "@/lib/types";

interface Bullet { text: string }

interface TheProblemProps {
  title?: string;
  problemBullets?: Bullet[];
  solutionText?: RichTextValue;
}

export function TheProblem({ title, problemBullets, solutionText }: TheProblemProps) {
  if (!title && !problemBullets?.length && !solutionText) return null;

  return (
    <section id="problem" className="bg-slate-900 text-white px-6 md:px-12 lg:px-24 py-32">
      <div className="max-w-7xl mx-auto">

        <motion.p
          className="font-mono text-xs tracking-[0.3em] uppercase text-[#efc868] mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          — {title}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Numbered problem bullets */}
          {problemBullets && problemBullets.length > 0 && (
            <ul className="space-y-0">
              {problemBullets.map((b, i) => (
                <motion.li
                  key={i}
                  className="flex gap-6 items-start border-b border-white/10 py-6 first:pt-0"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <span className="font-mono text-xs text-[#efc868] shrink-0 mt-0.5 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-base leading-relaxed text-slate-300">
                    {b.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Solution */}
          {solutionText && (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="flex flex-col gap-6"
            >
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#efc868]">
                The Solution
              </p>
              <div className="w-8 h-px bg-[#efc868]" />
              <div
                className="font-serif text-3xl md:text-4xl text-white font-normal leading-[1.25] [&_strong]:font-bold [&_em]:italic"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                <RichText
                  value={solutionText}
                  paragraphClass="font-serif text-3xl md:text-4xl text-white font-normal leading-[1.25] mb-3 last:mb-0"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
