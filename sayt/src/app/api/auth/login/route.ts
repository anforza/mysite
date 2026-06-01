import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { authCookieName, signAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();
  const user = await User.findOne({ email: body.email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(body.password, user.passwordHash);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signAdminToken({ email: user.email });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(authCookieName, token, { httpOnly: true, sameSite: "strict", secure: true, path: "/" });
  return res;
}
