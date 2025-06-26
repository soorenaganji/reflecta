import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User";
import generateUserId from "@/utils/generateUserId";

export async function POST(req) {
  await connectToDB();
  const { code, gender, username, score } = await req.json();
  let userName = username;
  // اعتبارسنجی اولیه
  if (
    typeof gender !== "string" ||
    !["Male", "Female", "Prefer Not to Say", "non-binary"].includes(gender) ||
    typeof username !== "string" ||
    !/^\d{5}$/.test(username) ||
    typeof score !== "object" ||
    !Array.isArray(score.phase1) ||
    !Array.isArray(score.phase2) ||
    !Array.isArray(score.phase3) ||
    !Array.isArray(score.phase4) ||
    !Array.isArray(score.phase5) ||
    !Array.isArray(score.phase6) ||
    !Array.isArray(score.phase7) ||
    !Array.isArray(score.phase8)
  ) {
    return NextResponse.json(
      { error: "Invalid input format" },
      { status: 400 }
    );
  }

  // چک آی‌دی تکراری
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    userName = generateUserId();
  }

  // ساخت یوزر جدید
  const newUser = await User.create({
    code,
    gender,
    username: userName,
    score,
  });

  return NextResponse.json({ username: newUser.username }, { status: 201 });
}
