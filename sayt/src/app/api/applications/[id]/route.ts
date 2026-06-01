import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Application } from "@/models/Application";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  await connectDB();
  const updated = await Application.findByIdAndUpdate(params.id, { status: body.status }, { new: true });
  if (!updated) return NextResponse.json({ error: "Application not found" }, { status: 404 });
  return NextResponse.json(updated);
}
