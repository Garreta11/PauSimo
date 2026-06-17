import { client } from "@/sanity/client";
import { landingQuery, caseStudiesQuery, settingsQuery } from "@/sanity/queries";
import { Hero } from "@/components/sections/Hero";
import { TheProblem } from "@/components/sections/TheProblem";
import { MainAreas } from "@/components/sections/MainAreas";
import { HowIWork } from "@/components/sections/HowIWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { WorkCarousel } from "@/components/WorkCarousel";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import type { RichTextValue } from "@/lib/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface LandingData {
  heroTitle?: string;
  heroDescription?: RichTextValue;
  heroLanguages?: string;
  heroCtaLabel?: string;
  heroImage?: { asset: { _ref: string }; alt?: string };
  problemTitle?: string;
  problemBullets?: { text: string }[];
  solutionText?: RichTextValue;
  areasSubheader?: string;
  areasDescription?: RichTextValue;
  areas?: {
    title?: string;
    description?: RichTextValue;
    bulletPoints?: { text: string }[];
    subtext?: string;
  }[];
  workSubheader?: string;
  workTitle?: string;
  workItems?: { text: RichTextValue }[];
  workMainSentence?: RichTextValue;
  testimonialsDescription?: string;
  testimonials?: { quote: RichTextValue; person: string; job?: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

export const revalidate = 60;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const landing: LandingData | null = await client
    .fetch(landingQuery, { documentId: `landing-${locale}` })
    .catch(() => null);
  return {
    title: landing?.seoTitle || "Pau Simó",
    description: landing?.seoDescription || "",
  };
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const [landing, caseStudies, settings]: [LandingData | null, unknown[], { contactEmail?: string } | null] =
    await Promise.all([
      client.fetch(landingQuery, { documentId: `landing-${locale}` }).catch(() => null),
      client.fetch(caseStudiesQuery, { language: locale }).catch(() => []),
      client.fetch(settingsQuery, { documentId: `settings-${locale}` }).catch(() => null),
    ]);

  return (
    <>
      <Hero
        title={landing?.heroTitle}
        description={landing?.heroDescription}
        languages={landing?.heroLanguages}
        ctaLabel={landing?.heroCtaLabel}
        image={landing?.heroImage}
        contactEmail={settings?.contactEmail}
        locale={locale as Locale}
      />

      <TheProblem
        title={landing?.problemTitle}
        problemBullets={landing?.problemBullets}
        solutionText={landing?.solutionText}
      />

      <MainAreas
        subheader={landing?.areasSubheader}
        description={landing?.areasDescription}
        areas={landing?.areas}
      />

      <HowIWork
        subheader={landing?.workSubheader}
        title={landing?.workTitle}
        items={landing?.workItems}
        mainSentence={landing?.workMainSentence}
      />

      {/* Case Studies Carousel */}
      {(caseStudies as unknown[]).length > 0 && (
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        <WorkCarousel studies={caseStudies as any[]} locale={locale as Locale} />
      )}

      <Testimonials
        description={landing?.testimonialsDescription}
        testimonials={landing?.testimonials}
      />
    </>
  );
}
