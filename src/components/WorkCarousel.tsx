"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { Locale } from "@/lib/i18n";

interface Study {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  category?: string;
  year?: string;
  description?: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
  tags?: string[];
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export function WorkCarousel({ studies, locale }: { studies: Study[]; locale: Locale }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => go(Math.max(0, current - 1));
  const next = () => go(Math.min(studies.length - 1, current + 1));

  const study = studies[current];
  const imageUrl = study.coverImage
    ? urlFor(study.coverImage).width(1200).height(900).url()
    : null;

  return (
    <section id="work" className="bg-[#faf8f3] px-6 md:px-12 lg:px-24 py-32">
      <div className="max-w-7xl mx-auto">

        {/* ── Header row ── */}
        <div className="flex items-end justify-between mb-12">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-slate-500">
            — Selected Work
          </p>

          <div className="flex items-center gap-6">
            {/* Counter */}
            <span className="font-mono text-xs text-slate-400 tabular-nums select-none">
              {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(studies.length).padStart(2, "0")}
            </span>

            {/* Arrows */}
            <div className="flex gap-2">
              <motion.button
                onClick={prev}
                disabled={current === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-mono text-base"
                aria-label="Previous"
              >
                ←
              </motion.button>
              <motion.button
                onClick={next}
                disabled={current === studies.length - 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-mono text-base"
                aria-label="Next"
              >
                →
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Slide ── */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] bg-slate-200 overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={study.coverImage?.alt || study.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                      No image
                    </span>
                  </div>
                )}
              </div>

              {/* Info panel */}
              <div className="bg-white p-8 md:p-12 lg:p-14 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400">
                    {study.category && <span>{study.category}</span>}
                    {study.client && (
                      <>
                        <span className="text-[#efc868]">—</span>
                        <span>{study.client}</span>
                      </>
                    )}
                    {study.year && (
                      <>
                        <span className="text-[#efc868]">—</span>
                        <span>{study.year}</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-serif text-3xl md:text-4xl font-normal leading-[1.15]"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {study.title}
                  </h3>

                  {/* Description */}
                  {study.description && (
                    <p className="font-mono text-sm text-slate-500 leading-relaxed">
                      {study.description}
                    </p>
                  )}
                </div>

                {/* Footer: tags + CTA */}
                <div className="mt-10 pt-8 border-t border-slate-100 space-y-6">
                  {study.tags && study.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs uppercase tracking-wider px-2.5 py-1 bg-[#e9ebef] text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={`/${locale}/case-studies/${study.slug.current}`}
                      className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate-900 hover:text-[#efc868] transition-colors"
                    >
                      View case study
                      <span className="text-[#efc868]">→</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex gap-2 mt-8 justify-center items-center">
          {studies.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-px transition-all duration-300 ${
                i === current
                  ? "w-10 bg-slate-900"
                  : "w-4 bg-slate-300 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
