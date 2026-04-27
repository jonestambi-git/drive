import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      fullName, email, phone, password, role,
      vehicleMake, vehicleModel, vehicleYear, vehicleColor, licensePlate,
    } = body;

    /* ── Validation ── */
    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        { message: "Full name, email, phone and password are required." },
        { status: 400 }
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    /* ── Check duplicate email ── */
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    /* ── Hash password ── */
    const hashed = await bcrypt.hash(password, 12);

    /* ── Create user ── */
    const userRole = role === "driver" ? "driver" : "rider";
    const userData: Record<string, unknown> = {
      fullName: fullName.trim(),
      email:    email.toLowerCase().trim(),
      phone:    phone.trim(),
      password: hashed,
      role:     userRole,
    };

    if (userRole === "driver") {
      userData.vehicleMake  = vehicleMake;
      userData.vehicleModel = vehicleModel;
      userData.vehicleYear  = vehicleYear;
      userData.vehicleColor = vehicleColor;
      userData.licensePlate = licensePlate;
      userData.driverStatus = "pending";
    }

    const user = await User.create(userData);

    /* ── Driver → pending, no token ── */
    if (userRole === "driver") {
      return NextResponse.json(
        { message: "Application submitted! We'll review your details and email you within 24 hours." },
        { status: 201 }
      );
    }

    /* ── Rider → return tokens ── */
    const payload = {
      userId:   user._id.toString(),
      fullName: user.fullName,
      email:    user.email,
      role:     user.role,
    };

    return NextResponse.json(
      {
        message:      "Account created successfully.",
        accessToken:  signAccessToken(payload),
        refreshToken: signRefreshToken(payload),
        user: {
          id:       user._id,
          fullName: user.fullName,
          email:    user.email,
          role:     user.role,
        },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("[register]", err);
    return NextResponse.json(
      { message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
