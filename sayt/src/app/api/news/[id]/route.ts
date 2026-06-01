import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { News } from "@/models/News";
import { newsSchema } from "@/lib/validators";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const payload = newsSchema.parse(await req.json());
  await connectDB();
  const updated = await News.findByIdAndUpdate(params.id, payload, { new: true });
  if (!updated) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await News.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
