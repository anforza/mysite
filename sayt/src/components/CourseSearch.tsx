"use client";

import { useMemo, useState } from "react";

type Course = { _id?: string; title: string; duration: string; fee: number; description: string };

export function CourseSearch({ courses }: { courses: Course[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      courses.filter((c) =>
        `${c.title} ${c.description}`.toLowerCase().includes(query.toLowerCase())
      ),
    [courses, query]
  );

  return (
    <div className="space-y-4">
      <input
        className="w-full rounded-lg border p-2"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((course) => (
          <article key={course._id ?? course.title} className="rounded-xl border bg-white p-4">
            <h3 className="font-semibold">{course.title}</h3>
            <p className="text-sm text-slate-600">{course.description}</p>
            <p className="mt-2 text-sm">Duration: {course.duration}</p>
            <p className="text-sm">Fee: ${course.fee}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
