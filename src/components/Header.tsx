"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { navItems } from "@/lib/nav";
import { urlFor } from "@/sanity/image";
import type { Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/types";

interface HeaderProps {
  locale: Locale;
  settings: SiteSettings | null;
}

export function Header({ locale, settings }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fallback = navItems[locale];
  const nl = settings?.navLabels;
  const items = [
    { label: nl?.problem      || fallback[0].label, href: fallback[0].href },
    { label: nl?.areas        || fallback[1].label, href: fallback[1].href },
    { label: nl?.howIWork     || fallback[2].label, href: fallback[2].href },
    { label: nl?.work         || fallback[3].label, href: fallback[3].href },
    { label: nl?.testimonials || fallback[4].label, href: fallback[4].href },
  ];

  const siteName = settings?.siteName || "Pau Simó Parés";
  const logoUrl  = settings?.logo ? urlFor(settings.logo).height(40).url() : null;

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-[72px] flex items-center gap-6">

          {/* ── Logo + name ── */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 shrink-0"
            onClick={closeMenu}
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={settings?.logo?.alt || siteName}
                height={32}
                width={120}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span
                className="font-serif text-2xl font-black leading-none"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                PS
              </span>
            )}
            <span className="font-mono text-xs uppercase tracking-wider hidden md:block text-foreground">
              {siteName}
            </span>
          </Link>

          {/* ── Desktop nav — centred, never wraps ── */}
          <nav className="hidden xl:flex items-center gap-5 flex-1 justify-center">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-4 shrink-0 ml-auto xl:ml-0">
            <LocaleSwitcher currentLocale={locale} />

            {/* Hamburger — below xl only */}
            <button
              className="xl:hidden flex flex-col justify-center gap-[5px] w-6 h-6 ml-2"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-px bg-foreground origin-center"
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px bg-foreground"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px bg-foreground origin-center"
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile / tablet menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col px-6 md:px-12 pt-28 pb-12"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col gap-6 flex-1">
              {items.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="font-serif text-3xl md:text-4xl font-normal text-foreground hover:text-[#efc868] transition-colors border-b border-slate-100 pb-6"
                  style={{ fontFamily: "Playfair Display, serif" }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mr-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Language selector in mobile menu */}
            <div className="pt-8 border-t border-border">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Language
              </p>
              <div className="flex flex-wrap gap-3">
                {(["en", "ca", "es", "fr"] as const).map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}`}
                    onClick={closeMenu}
                    className={`font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
                      loc === locale
                        ? "border-foreground bg-foreground text-white"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {loc.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
