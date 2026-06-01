import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = params.locale;
  if (!locales.includes(locale)) notFound();

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="container-page py-8">{children}</main>
      <SiteFooter />
    </>
  );
}
