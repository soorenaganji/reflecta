"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DigitTestSection from "@/components/DigitTestSection";
import heartIcon from "@/public/heart.svg";
import Image from "next/image";
const SECTIONS = [
  { length: 2, count: 2, key: "phase1" },
  { length: 3, count: 2, key: "phase2" },
  { length: 4, count: 2, key: "phase3" },
  { length: 5, count: 2, key: "phase4" },
  { length: 6, count: 2, key: "phase5" },
  { length: 7, count: 2, key: "phase6" },
  { length: 8, count: 2, key: "phase7" },
  { length: 9, count: 2, key: "phase8" },
];

export default function Step4() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [result, setResult] = useState({
    phase1: 0,
    phase2: 0,
    phase3: 0,
    phase4: 0,
    phase5: 0,
    phase6: 0,
    phase7: 0,
    phase8: 0,
  });
  const [isDone, setIsDone] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [shouldShake, setShouldShake] = useState(false);
  const router = useRouter();
  const prevMistake = useRef(mistakeCount);
  useEffect(() => {
    // فقط وقتی mistakeCount زیاد میشه (افزایشی)
    if (mistakeCount > prevMistake.current) {
      setShouldShake(true);
      const timer = setTimeout(() => {
        setShouldShake(false);
      }, 3000);
      // تمیزکاری تایمر
      return () => clearTimeout(timer);
    }
    prevMistake.current = mistakeCount;
  }, [mistakeCount]);
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
      code: user.code,
      gender: user.gender,
      id: user.id,
      score: { ...result },
    };

    // نتیجه رو ذخیره کن
    localStorage.setItem("result", JSON.stringify(resultToSave));
    // reflecta-user رو پاک کن
    localStorage.removeItem("reflecta-user");
    console.log(resultToSave);
    // داده رو بفرست به سرور
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultToSave),
    }).finally(() => {
      // بعد از ارسال، کل localStorage رو پاک کن
      localStorage.clear();
    });

    return (
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-2xl min-h-[300px] flex flex-col items-center justify-center space-y-4">
        <div className="text-xl font-bold">Test finished</div>
        <div>
          <pre className="text-left">
            Your Score is:{" "}
            {result?.phase1 +
              result?.phase2 +
              result?.phase3 +
              result?.phase4 +
              result?.phase5 +
              result?.phase6 +
              result?.phase7 +
              result?.phase8}
            /16
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
    <>
      <div className="w-full flex items-center justify-center gap-6">
        {Array.from({ length: 3 - mistakeCount }).map((_, i) => (
          <Image
            key={i}
            src={heartIcon}
            width={24}
            height={24}
            alt="heart"
            style={{ display: "inline", marginRight: "2px" }}
            className={shouldShake ? " shake" : ""}
          />
        ))}
      </div>
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg min-h-[300px] flex items-center justify-center">
        <DigitTestSection
          mistakeCount={mistakeCount}
          setMistakeCount={setMistakeCount}
          setIsDone={setIsDone}
          key={sectionIndex}
          length={SECTIONS[sectionIndex].length}
          count={SECTIONS[sectionIndex].count}
          onFinish={handleSectionFinish}
        />
      </div>
    </>
  );
}
