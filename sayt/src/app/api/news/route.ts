import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { News } from "@/models/News";
import { newsSchema } from "@/lib/validators";

export async function GET() {
  await connectDB();
  const items = await News.find().sort({ publishedAt: -1 });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const payload = newsSchema.parse(await req.json());
  await connectDB();
  const created = await News.create(payload);
  return NextResponse.json(created, { status: 201 });
}
