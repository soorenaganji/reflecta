"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DigitTestSection from "@/components/DigitTestSection";

const SECTIONS = [
  { length: 2, count: 2, key: "phase1" },
  { length: 3, count: 2, key: "phase2" },
  { length: 4, count: 2, key: "phase3" },
];

export default function Step4() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [result, setResult] = useState({});
  const [isDone, setIsDone] = useState(false);
  const router = useRouter();

  // این تابع رو به DigitTestSection می‌دیم
  const handleSectionFinish = (score) => {
    setResult((prev) => ({
      ...prev,
      [SECTIONS[sectionIndex].key]: score,
    }));
    if (sectionIndex + 1 < SECTIONS.length) {
      setSectionIndex(sectionIndex + 1);
    } else {
      setIsDone(true);
    }
  };

  // وقتی تست تموم شد، ذخیره در localStorage (فقط یکبار)
  if (isDone) {
    // اطلاعات کاربر و نتیجه رو بگیر
    const user = JSON.parse(localStorage.getItem("reflecta-user") || "{}");
    const resultToSave = {
      age: user.age,
      gender: user.gender,
      id: user.id,
      score: { ...result },
    };
  
    // نتیجه رو ذخیره کن
    localStorage.setItem("result", JSON.stringify(resultToSave));
    // reflecta-user رو پاک کن
    localStorage.removeItem("reflecta-user");
  
    // داده رو بفرست به سرور
    fetch('/api/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultToSave),
    })
    .finally(() => {
      // بعد از ارسال، کل localStorage رو پاک کن
      localStorage.clear();
    });
  
    return (
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-2xl min-h-[300px] flex flex-col items-center justify-center space-y-4">
        <div className="text-xl font-bold">Test finished</div>
        <div>
          <pre className="text-left">
            Your Score is: {result?.phase1 + result?.phase2 + result?.phase3}/6
          </pre>
        </div>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-xl transition duration-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-600"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  

  // فقط یه بخش فعاله
  return (
    <DigitTestSection
      key={sectionIndex}
      length={SECTIONS[sectionIndex].length}
      count={SECTIONS[sectionIndex].count}
      onFinish={handleSectionFinish}
    />
  );
}
