import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Course } from "@/models/Course";
import { courseSchema } from "@/lib/validators";

export async function GET() {
  await connectDB();
  const courses = await Course.find().sort({ createdAt: -1 });
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const payload = courseSchema.parse(await req.json());
  await connectDB();
  const created = await Course.create(payload);
  return NextResponse.json(created, { status: 201 });
}
