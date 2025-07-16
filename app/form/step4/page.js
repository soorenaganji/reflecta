"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DigitTestSection from "@/components/DigitTestSection";
import { useLanguage } from "@/components/LanguageProvider";
import generateUniqueDigitNumber from "@/utils/randomNumberGenerator";
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
  const MAX_MISTAKES = 3;
  const [task, setTask] = useState("forward");
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [result, setResult] = useState({
    phase1: [0, 0],
    phase2: [0, 0],
    phase3: [0, 0],
    phase4: [0, 0],
    phase5: [0, 0],
    phase6: [0, 0],
    phase7: [0, 0],
    phase8: [0, 0],
  });
  const [isDone, setIsDone] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);
  const router = useRouter();
  const { t } = useLanguage();
  const usedSequences = useRef(new Set());
  // این تابع رو به DigitTestSection می‌دیم
  const handleSectionFinish = (score) => {
    const key = SECTIONS[sectionIndex].key;
    setResult((prev) => ({
      ...prev,
      [key]: task === "forward" ? [score, prev[key][1]] : [prev[key][0], score],
    }));

    if (mistakeCount >= MAX_MISTAKES) {
      console.log("you reached max mistakes");
      if (task === "forward") {
        setTask("backward");
        setSectionIndex(0);
        setMistakeCount(0);
        setAwaitingContinue(true);
      } else {
        setIsDone(true);
      }
      return;
    }

    if (sectionIndex + 1 < SECTIONS.length) {
      setSectionIndex(sectionIndex + 1);
    } else if (task === "forward") {
      setTask("backward");
      setSectionIndex(0);
      setMistakeCount(0);
      setAwaitingContinue(true);
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
      username: user.id,
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
        <div className="text-xl font-bold">{t("test_finished")}</div>
        <div>
          <pre className="text-left ">{t("your_score")}</pre>
          <p>
            Forward:{" "}
            {result.phase1[0] +
              result.phase2[0] +
              result.phase3[0] +
              result.phase4[0] +
              result.phase5[0] +
              result.phase6[0] +
              result.phase7[0] +
              result.phase8[0]}
            /16
          </p>
          <p>
            Backward:{" "}
            {result.phase1[1] +
              result.phase2[1] +
              result.phase3[1] +
              result.phase4[1] +
              result.phase5[1] +
              result.phase6[1] +
              result.phase7[1] +
              result.phase8[1]}
            /16
          </p>
        </div>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-xl transition duration-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-600"
          onClick={() => router.push("/")}
        >
          {t("back_home")}
        </button>
      </div>
    );
  }

  // فقط یه بخش فعاله
  return (
    <>
      {!awaitingContinue && (
        <>
          <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg min-h-[300px] flex items-center justify-center">
            <DigitTestSection
              mistakeCount={mistakeCount}
              setMistakeCount={setMistakeCount}
              key={`${task}-${sectionIndex}`}
              length={SECTIONS[sectionIndex].length}
              count={SECTIONS[sectionIndex].count}
              onFinish={handleSectionFinish}
              direction={task}
              generateSequence={(len) => {
                let seq;
                do {
                  seq = generateUniqueDigitNumber(len).join("");
                } while (usedSequences.current.has(seq));
                usedSequences.current.add(seq);
                return seq.split("");
              }}
            />
          </div>
        </>
      )}
      {awaitingContinue && (
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-2xl min-h-[300px] flex flex-col items-center justify-center space-y-4">
          <p className="text-center">{t("backward_intro")}</p>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl transition duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600"
            onClick={() => setAwaitingContinue(false)}
          >
            {t("continue")}
          </button>
        </div>
      )}
    </>
  );
}
