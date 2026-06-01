"use client";

import { useEffect, useState } from "react";

type Course = { _id: string; title: string; duration: string; fee: number; description: string };
type Post = { _id: string; title: string; body: string };

export function AdminDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [c, n, a] = await Promise.all([
      fetch("/api/courses").then((r) => r.json()),
      fetch("/api/news").then((r) => r.json()),
      fetch("/api/applications").then((r) => r.json()),
    ]);
    setCourses(c);
    setPosts(n);
    setApps(a);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function createCourse(formData: FormData) {
    await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: String(formData.get("title")),
        duration: String(formData.get("duration")),
        fee: Number(formData.get("fee")),
        description: String(formData.get("description")),
      }),
    });
    await load();
  }

  async function createNews(formData: FormData) {
    await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: String(formData.get("title")),
        body: String(formData.get("body")),
      }),
    });
    await load();
  }

  async function deleteCourse(id: string) {
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    await load();
  }

  async function deletePost(id: string) {
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      {loading ? <p>Loading...</p> : null}
      <section className="grid gap-4 md:grid-cols-2">
        <form action={createCourse} className="space-y-2 rounded-xl border bg-white p-4">
          <h2 className="font-semibold">Add Course</h2>
          <input name="title" required className="w-full rounded border p-2" placeholder="Title" />
          <input name="duration" required className="w-full rounded border p-2" placeholder="Duration" />
          <input name="fee" required type="number" className="w-full rounded border p-2" placeholder="Fee" />
          <textarea name="description" required className="w-full rounded border p-2" placeholder="Description" />
          <button className="rounded bg-brand-700 px-4 py-2 text-white">Save Course</button>
        </form>
        <form action={createNews} className="space-y-2 rounded-xl border bg-white p-4">
          <h2 className="font-semibold">Add News</h2>
          <input name="title" required className="w-full rounded border p-2" placeholder="Title" />
          <textarea name="body" required className="w-full rounded border p-2" placeholder="Body" />
          <button className="rounded bg-brand-700 px-4 py-2 text-white">Save News</button>
        </form>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-4">
          <h3 className="font-semibold">Courses ({courses.length})</h3>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h3 className="font-semibold">Posts ({posts.length})</h3>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h3 className="font-semibold">Applications ({apps.length})</h3>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-3 font-semibold">Manage Courses</h3>
          <div className="space-y-2">
            {courses.map((course) => (
              <div key={course._id} className="flex items-center justify-between rounded border p-2">
                <span>{course.title}</span>
                <button onClick={() => deleteCourse(course._id)} className="text-sm text-red-600">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-3 font-semibold">Manage News</h3>
          <div className="space-y-2">
            {posts.map((post) => (
              <div key={post._id} className="flex items-center justify-between rounded border p-2">
                <span>{post.title}</span>
                <button onClick={() => deletePost(post._id)} className="text-sm text-red-600">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
