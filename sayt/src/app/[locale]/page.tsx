import Link from "next/link";
import { getText, Locale } from "@/lib/i18n";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-900 p-8 text-white">
        <h1 className="text-3xl font-bold">{getText(locale, "heroTitle")}</h1>
        <p className="mt-4 max-w-2xl">{getText(locale, "heroDesc")}</p>
        <div className="mt-6 flex gap-3">
          <Link href={`/${locale}/admission`} className="rounded-md bg-white px-4 py-2 text-brand-700">
            Apply Now
          </Link>
          <Link href={`/${locale}/courses`} className="rounded-md border border-white px-4 py-2">
            Explore Courses
          </Link>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Announcements</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {["Admission open for 2026", "Scholarship test this month", "New AI program launched"].map((item) => (
            <article key={item} className="rounded-xl border bg-white p-4">
              {item}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
