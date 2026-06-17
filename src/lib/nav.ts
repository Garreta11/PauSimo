import type { Locale } from "./i18n";

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: Record<Locale, NavItem[]> = {
  en: [
    { label: "The Problem", href: "#problem" },
    { label: "Areas", href: "#areas" },
    { label: "Process", href: "#how-i-work" },
    { label: "Work", href: "#work" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  ca: [
    { label: "El Problema", href: "#problem" },
    { label: "Àrees", href: "#areas" },
    { label: "Procés", href: "#how-i-work" },
    { label: "Treballs", href: "#work" },
    { label: "Testimonis", href: "#testimonials" },
  ],
  es: [
    { label: "El Problema", href: "#problem" },
    { label: "Áreas", href: "#areas" },
    { label: "Proceso", href: "#how-i-work" },
    { label: "Trabajos", href: "#work" },
    { label: "Testimonios", href: "#testimonials" },
  ],
  fr: [
    { label: "Le Problème", href: "#problem" },
    { label: "Domaines", href: "#areas" },
    { label: "Processus", href: "#how-i-work" },
    { label: "Travaux", href: "#work" },
    { label: "Témoignages", href: "#testimonials" },
  ],
};
