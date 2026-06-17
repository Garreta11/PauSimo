"use client";

import { motion } from "motion/react";
import { Mail, ArrowUpRight } from "lucide-react";
import { RichText } from "@/components/RichText";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import type { Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/types";

interface FooterProps {
  locale: Locale;
  settings: SiteSettings | null;
}

export function Footer({ locale, settings }: FooterProps) {
  const subtitle    = settings?.contactSubtitle    || "Let's work together";
  const title       = settings?.contactTitle       || "Ready to reach new audiences?";
  const description = settings?.contactDescription || "";
  const email       = settings?.contactEmail       || "psimop@gmail.com";
  const linkedin    = settings?.linkedinUrl        || "https://www.linkedin.com/in/pausimpar/";
  const siteName    = settings?.siteName           || "Pau Simó Parés";
  const footerNote  = settings?.footerNote         || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`;

  return (
    <footer id="contact" className="bg-[#efc868] px-6 md:px-12 lg:px-24 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* ── Left: title + description ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-slate-600 mb-6">
              {subtitle}
            </p>
            <h2
              className="font-serif text-3xl lg:text-4xl leading-[1.1] text-slate-900 mb-8"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {title}
            </h2>
            {description && (
              <RichText
                value={description}
                paragraphClass="font-mono text-sm text-slate-800 leading-relaxed max-w-md mb-2 last:mb-0"
              />
            )}
          </motion.div>

          {/* ── Right: links + copyright ── */}
          <motion.div
            className="space-y-8 lg:pt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-0">
              {/* Email */}
              <motion.a
                href={`mailto:${email}`}
                className="flex items-center justify-between gap-4 text-base text-slate-900 hover:text-slate-700 transition-colors group py-4 border-b border-slate-700/30"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-4 font-mono">
                  <Mail className="w-5 h-5 shrink-0" />
                  <span>{email}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 text-base text-slate-900 hover:text-slate-700 transition-colors group py-4 border-b border-slate-700/30"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-4 font-mono">
                  <LinkedinIcon className="w-5 h-5 shrink-0" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </motion.a>
            </div>

            {/* Footer note */}
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-slate-600">
              {footerNote}
            </p>
          </motion.div>

        </div>
      </div>
    </footer>
  );
}
