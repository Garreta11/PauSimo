"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { RichText } from "@/components/RichText";
import type { Locale } from "@/lib/i18n";
import type { RichTextValue } from "@/lib/types";

interface HeroProps {
  title?: string;
  description?: RichTextValue;
  languages?: string;
  ctaLabel?: string;
  contactEmail?: string;
  image?: { asset: { _ref: string }; alt?: string };
  locale: Locale;
}

export function Hero({ title, description, languages, ctaLabel, contactEmail, image, locale }: HeroProps) {
  const imageUrl = image ? urlFor(image).width(800).height(1067).url() : null;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-32">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Text side ── */}
          <div className="space-y-8">

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                className="text-3xl lg:text-5xl leading-[1.1] font-serif pb-10"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {title || "Pau Simó"}
              </h1>

              {description && (
                <RichText
                  value={description}
                  paragraphClass="text-sm tracking-[0.25em] uppercase text-slate-500 leading-relaxed"
                />
              )}
            </motion.div>

            {languages && (
              <motion.div
                className="space-y-6 pt-8 border-t border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-lg tracking-wide font-mono">{languages}</p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="w-fit"
            >
              <motion.a
                href={contactEmail ? `mailto:${contactEmail}` : "#problem"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-[#efc868] hover:bg-[#745620] text-white px-12 py-4 text-base tracking-widest uppercase transition-colors font-mono"
              >
                {ctaLabel || "Let's talk"}
              </motion.a>
            </motion.div>

          </div>

          {/* ── Image side ── */}
          {imageUrl && (
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative w-[95%] max-w-md mx-auto">
                <motion.div
                  className="absolute -inset-4 bg-slate-900 opacity-5"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 3 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <Image
                  src={imageUrl}
                  alt={image?.alt || title || "Pau Simó"}
                  width={600}
                  height={800}
                  className="relative w-full aspect-[3/4] object-cover"
                  priority
                />
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
