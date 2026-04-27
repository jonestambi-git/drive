import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { verifyAccessToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const token = auth.slice(7);
    const payload = verifyAccessToken(token);

    await connectDB();
    const user = await User.findById(payload.userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ message: "Invalid or expired token." }, { status: 401 });
  }
}
