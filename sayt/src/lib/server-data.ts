import { connectDB } from "@/lib/db";
import { Course } from "@/models/Course";
import { News } from "@/models/News";

const sampleCourses = [
  { title: "Computer Science", duration: "4 years", fee: 1200, description: "Software, AI, and systems." },
  { title: "Business Management", duration: "4 years", fee: 1000, description: "Finance and strategy." },
];

export async function getCourses() {
  try {
    await connectDB();
    const courses = await Course.find().sort({ createdAt: -1 }).lean();
    return courses.length ? courses : sampleCourses;
  } catch {
    return sampleCourses;
  }
}

export async function getNews() {
  try {
    await connectDB();
    return await News.find().sort({ publishedAt: -1 }).lean();
  } catch {
    return [];
  }
}
