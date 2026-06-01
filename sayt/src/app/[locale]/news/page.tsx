import { getNews } from "@/lib/server-data";

export default async function NewsPage() {
  const news = await getNews();
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">News and Blog</h1>
      <div className="grid gap-4">
        {news.length === 0 ? <p>No news yet.</p> : null}
        {news.map((item: any) => (
          <article key={item._id?.toString() ?? item.title} className="rounded-xl border bg-white p-4">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-slate-700">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
