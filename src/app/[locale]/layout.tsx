import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { client } from "@/sanity/client";
import { settingsQuery } from "@/sanity/queries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { SiteSettings } from "@/lib/types";

export const revalidate = 60;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const typedLocale = locale as Locale;

  const settings: SiteSettings | null = await client
    .fetch(settingsQuery, { documentId: `settings-${locale}` })
    .catch(() => null);

  return (
    <div lang={typedLocale} className="flex flex-col min-h-screen">
      <Header locale={typedLocale} settings={settings} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer locale={typedLocale} settings={settings} />
    </div>
  );
}
