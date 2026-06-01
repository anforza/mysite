import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Application } from "@/models/Application";

export async function GET() {
  await connectDB();
  const applications = await Application.find().sort({ createdAt: -1 });
  return NextResponse.json(applications);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const fullName = String(formData.get("fullName") ?? "");
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const program = String(formData.get("program") ?? "");
  const file = formData.get("document") as File | null;

  if (!fullName || !email || !phone || !program) {
    return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
  }

  let documentUrl = "";
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, safeName), buffer);
    documentUrl = `/uploads/${safeName}`;
  }

  await connectDB();
  const created = await Application.create({ fullName, email, phone, program, documentUrl });
  return NextResponse.json(created, { status: 201 });
}
