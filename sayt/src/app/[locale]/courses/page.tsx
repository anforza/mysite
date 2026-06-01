import { CourseSearch } from "@/components/CourseSearch";
import { getCourses } from "@/lib/server-data";

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Programs and Courses</h1>
      <CourseSearch courses={courses} />
    </section>
  );
}
