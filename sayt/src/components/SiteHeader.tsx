import Link from "next/link";
import { Locale, getText, locales } from "@/lib/i18n";

const navItems = ["home", "about", "courses", "admission", "news", "contact"] as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="border-b bg-white">
      <div className="container-page flex items-center justify-between py-4">
        <Link href={`/${locale}`} className="font-bold text-brand-700">
          EDU PORTAL
        </Link>
        <nav className="hidden gap-4 text-sm md:flex">
          {navItems.map((item) => (
            <Link key={item} href={item === "home" ? `/${locale}` : `/${locale}/${item}`}>
              {getText(locale, item)}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2 text-xs">
          {locales.map((l) => (
            <Link key={l} href={`/${l}`} className={l === locale ? "font-semibold text-brand-700" : ""}>
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
