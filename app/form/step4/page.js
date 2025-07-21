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
  const [task, setTask] = useState("forward");
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const [practiceState, setPracticeState] = useState(null); // null | 'intro' | 'test' | 'done'
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

    if (score === 0) {
      if (task === "forward") {
        setTask("backward");
        setSectionIndex(0);
        setPracticeState("intro");
        setAwaitingContinue(false);
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
      setPracticeState("intro");
      setAwaitingContinue(false);
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
        <div className="text-xl font-bold">{t("thanks")}</div>
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
  if (practiceState === "intro") {
    return (
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-2xl min-h-[300px] flex flex-col items-center justify-center space-y-4">
        <p className="text-center">{t("practice_intro")}</p>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl transition duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600"
          onClick={() => setPracticeState("test")}
        >
          {t("practice_start")}
        </button>
      </div>
    );
  }

  if (practiceState === "test") {
    return (
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg min-h-[300px] flex items-center justify-center">
        <DigitTestSection
          key="practice"
          length={2}
          count={1}
          onFinish={() => setPracticeState("done")}
          direction="backward"
        />
      </div>
    );
  }

  if (practiceState === "done") {
    return (
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-2xl min-h-[300px] flex flex-col items-center justify-center space-y-4">
        <p className="text-center">{t("practice_end")}</p>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl transition duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600"
          onClick={() => {
            setPracticeState(null);
            setAwaitingContinue(true);
          }}
        >
          {t("continue")}
        </button>
      </div>
    );
  }

  return (
    <>
      {!awaitingContinue && (
        <>
          <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg min-h-[300px] flex items-center justify-center">
            <DigitTestSection
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
