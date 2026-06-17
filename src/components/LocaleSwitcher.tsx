"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors select-none"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{currentLocale.toUpperCase()}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-3 bg-white border border-border shadow-md min-w-[160px] z-50"
          >
            {locales.map((locale) => {
              const active = locale === currentLocale;
              return (
                <Link
                  key={locale}
                  href={`/${locale}`}
                  role="option"
                  aria-selected={active}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0 transition-colors ${
                    active
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-widest w-7 shrink-0">
                    {locale.toUpperCase()}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                    {localeNames[locale]}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
