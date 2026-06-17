"use client";

import { motion } from "motion/react";
import { RichText } from "@/components/RichText";
import type { RichTextValue } from "@/lib/types";

interface WorkItem { text: RichTextValue }

interface HowIWorkProps {
  subheader?: string;
  title?: string;
  items?: WorkItem[];
  mainSentence?: RichTextValue;
}

export function HowIWork({ subheader, title, items, mainSentence }: HowIWorkProps) {
  if (!subheader && !title && !items?.length && !mainSentence) return null;

  return (
    <section id="how-i-work" className="bg-[#fef9ee] px-6 md:px-12 lg:px-24 py-32">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end pb-16 border-b border-[#efc868]/30 mb-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {subheader && (
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-slate-500 mb-0">
                — {subheader}
              </p>
            )}
          </motion.div>

          {title && (
            <motion.h2
              className="font-serif text-3xl md:text-4xl lg:text-4xl leading-[1.1] font-normal"
              style={{ fontFamily: "Playfair Display, serif" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {title}
            </motion.h2>
          )}
        </div>

        {/* Steps */}
        {items && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#efc868]/20 border border-[#efc868]/20 mt-0">
            {items.map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#fef9ee] p-10 lg:p-12 flex flex-col gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
              >
                <span className="font-mono text-xs tracking-widest text-[#efc868] select-none tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <RichText
                  value={item.text}
                  paragraphClass="font-mono text-base text-slate-600 leading-relaxed mb-2 last:mb-0"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Closing sentence */}
        {mainSentence && (
          <motion.div
            className="pt-24 border-t border-[#efc868]/20 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="max-w-3xl mx-auto"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              <RichText
                value={mainSentence}
                paragraphClass="font-serif text-3xl md:text-4xl lg:text-4xl font-normal text-slate-900 leading-[1.2] mb-3 last:mb-0"
              />
            </div>
            <div className="w-12 h-0.5 bg-[#efc868] mx-auto mt-8" />
          </motion.div>
        )}

      </div>
    </section>
  );
}
