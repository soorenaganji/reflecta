import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User";
import generateUserId from "@/utils/generateUserId";

export async function POST(req) {
  await connectToDB();
  const { code, gender, id, score } = await req.json();
  let userName = id;
  // اعتبارسنجی اولیه
  if (
    typeof gender !== "string" ||
    !["Male", "Female", "Prefer Not to Say", "non-binary"].includes(gender) ||
    typeof id !== "string" ||
    !/^\d{5}$/.test(id) ||
    typeof score !== "object" ||
    typeof +score.forward !== "number" ||
    typeof +score.backward !== "number"
  ) {
    return NextResponse.json(
      { error: "Invalid input format" },
      { status: 400 }
    );
  }

  // چک آی‌دی تکراری
  const existingUser = await User.findOne({ username: id });
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
