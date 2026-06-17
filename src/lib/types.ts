import type { PortableTextBlock } from "next-sanity";

export type RichTextValue = PortableTextBlock[];

export interface SiteSettings {
  logo?: { asset: { _ref: string }; alt?: string };
  siteName?: string;
  navLabels?: {
    problem?: string;
    areas?: string;
    howIWork?: string;
    work?: string;
    testimonials?: string;
  };
  contactSubtitle?: string;
  contactTitle?: string;
  contactDescription?: RichTextValue;
  contactEmail?: string;
  linkedinUrl?: string;
  footerNote?: string;
}
