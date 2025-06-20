import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User";
import generateUserId from "@/utils/generateUserId";

export async function POST(req) {
  await connectToDB();
  const { age, gender, id, score } = await req.json();
  let userName = id;
  console.log(age);
  console.log(gender);
  console.log(id);
  console.log(score);
  // اعتبارسنجی اولیه
  if (
    typeof +age !== "number" ||
    isNaN(age) ||
    age < 5 ||
    age > 120 ||
    typeof gender !== "string" ||
    !["Male", "Female"].includes(gender) ||
    typeof id !== "string" ||
    !/^\d{5}$/.test(id) ||
    typeof score !== "object" ||
    typeof +score.phase1 !== "number" ||
    typeof +score.phase2 !== "number" ||
    typeof +score.phase3 !== "number"
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
    age,
    gender,
    username: userName,
    score,
  });

  return NextResponse.json({ username: newUser.username }, { status: 201 });
}
