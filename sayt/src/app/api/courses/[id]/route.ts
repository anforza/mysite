import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Course } from "@/models/Course";
import { courseSchema } from "@/lib/validators";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const payload = courseSchema.parse(await req.json());
  await connectDB();
  const updated = await Course.findByIdAndUpdate(params.id, payload, { new: true });
  if (!updated) return NextResponse.json({ error: "Course not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await Course.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Course not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
