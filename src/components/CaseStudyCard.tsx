import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { Locale } from "@/lib/i18n";

interface CaseStudy {
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

export function CaseStudyCard({ study, locale }: { study: CaseStudy; locale: Locale }) {
  const imageUrl = study.coverImage
    ? urlFor(study.coverImage).width(800).height(500).url()
    : null;

  return (
    <Link href={`/${locale}/case-studies/${study.slug.current}`} className="group block">
      <article className="border border-border hover:bg-accent transition-colors">
        {imageUrl && (
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <Image
              src={imageUrl}
              alt={study.coverImage?.alt || study.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground mb-3 uppercase tracking-wider">
            {study.category && <span>{study.category}</span>}
            {study.category && study.year && <span>—</span>}
            {study.year && <span>{study.year}</span>}
          </div>
          <h3 className="font-serif text-xl font-bold mb-1 group-hover:opacity-70 transition-opacity">
            {study.title}
          </h3>
          {study.client && (
            <p className="font-mono text-xs text-muted-foreground mb-3">{study.client}</p>
          )}
          {study.description && (
            <p className="font-mono text-base text-muted-foreground line-clamp-2 leading-relaxed">
              {study.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
