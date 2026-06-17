import { client } from "@/sanity/client";
import { caseStudyBySlugQuery, caseStudiesQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { RichText } from "@/components/RichText";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import type { RichTextValue } from "@/lib/types";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  category?: string;
  year?: string;
  description?: string;
  context?: RichTextValue;
  intervention?: RichTextValue;
  criterion?: RichTextValue;
  result?: RichTextValue;
  coverImage?: { asset: { _ref: string }; alt?: string };
  tags?: string[];
}

const sectionLabels: Record<Locale, Record<string, string>> = {
  en: { context: "Context", intervention: "Intervention", criterion: "Criterion", result: "Result" },
  ca: { context: "Context", intervention: "Intervenció", criterion: "Criteri", result: "Resultat" },
  es: { context: "Contexto", intervention: "Intervención", criterion: "Criterio", result: "Resultado" },
  fr: { context: "Contexte", intervention: "Intervention", criterion: "Critère", result: "Résultat" },
};

export const revalidate = 60;

export async function generateStaticParams() {
  const results = await Promise.all(
    locales.map((locale) =>
      client
        .fetch(caseStudiesQuery, { language: locale })
        .then((studies: CaseStudy[]) =>
          studies.map((s) => ({ locale, slug: s.slug.current }))
        )
        .catch(() => [])
    )
  );
  return results.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const study: CaseStudy | null = await client
    .fetch(caseStudyBySlugQuery, { slug, language: locale })
    .catch(() => null);
  return {
    title: study ? `${study.title} — Pau Simó` : "Pau Simó",
    description: study?.description || "",
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const study: CaseStudy | null = await client
    .fetch(caseStudyBySlugQuery, { slug, language: locale as Locale })
    .catch(() => null);

  if (!study) notFound();

  const labels = sectionLabels[locale as Locale];

  const imageUrl = study.coverImage
    ? urlFor(study.coverImage).width(1600).height(900).url()
    : null;

  const contentSections = [
    { key: "context",      label: labels.context,      value: study.context },
    { key: "intervention", label: labels.intervention, value: study.intervention },
    { key: "criterion",    label: labels.criterion,    value: study.criterion },
    { key: "result",       label: labels.result,       value: study.result, highlight: true },
  ].filter((s) => s.value && s.value.length > 0);

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-white px-6 md:px-12 lg:px-24 pt-16 pb-0 max-w-7xl mx-auto">
        <Link
          href={`/${locale}#work`}
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-block mb-12"
        >
          ← Back
        </Link>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
          {study.category && <span>{study.category}</span>}
          {study.client && <><span className="text-[#efc868]">—</span><span>{study.client}</span></>}
          {study.year && <><span className="text-[#efc868]">—</span><span>{study.year}</span></>}
        </div>

        <h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-8 max-w-4xl"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {study.title}
        </h1>

        {study.description && (
          <p className="font-mono text-base text-muted-foreground max-w-2xl leading-relaxed mb-16">
            {study.description}
          </p>
        )}
      </div>

      {/* ── Cover image ── */}
      {imageUrl && (
        <div className="relative aspect-[16/7] overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={study.coverImage?.alt || study.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* ── Content sections ── */}
      {contentSections.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-16">
          {contentSections.map((section, i) => (
            <div
              key={section.key}
              className={`grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-16 py-16 border-b border-slate-100 last:border-b-0 ${
                section.highlight ? "bg-slate-900 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24" : ""
              }`}
            >
              {/* Label */}
              <div className="flex lg:flex-col lg:items-start gap-3 items-center">
                <span className={`font-mono text-xs tracking-[0.3em] uppercase ${section.highlight ? "text-[#efc868]" : "text-muted-foreground"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`font-mono text-xs tracking-[0.3em] uppercase ${section.highlight ? "text-[#efc868]" : "text-muted-foreground"}`}>
                  {section.label}
                </span>
              </div>

              {/* Rich text content */}
              <div className={section.highlight ? "text-white" : "text-slate-700"}>
                <RichText
                  value={section.value!}
                  paragraphClass={`font-mono text-base leading-relaxed mb-4 last:mb-0 ${
                    section.highlight ? "text-white" : "text-slate-700"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Tags ── */}
      {study.tags && study.tags.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 border-t border-slate-100 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 bg-accent text-accent-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
