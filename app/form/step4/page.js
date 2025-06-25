"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DigitTestSection from "@/components/DigitTestSection";
import { useLanguage } from "@/components/LanguageProvider";

const LENGTHS = [2, 3, 4, 5, 6, 7, 8, 9];

export default function Step4() {
  const { t } = useLanguage();
  const router = useRouter();
  const usedSequences = useRef(new Set());

  const [task, setTask] = useState("forward"); // forward | break | backward | done
  const [index, setIndex] = useState(0);
  const [forwardScore, setForwardScore] = useState(0);
  const [backwardScore, setBackwardScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [sectionKey, setSectionKey] = useState(0);

  const handleFinish = (correctCount) => {
    const length = LENGTHS[index];
    if (correctCount > 0) {
      if (task === "forward") setForwardScore(length);
      else setBackwardScore(length);
    } else {
      if (task === "forward") {
        setTask("break");
        setIndex(0);
        setSectionKey((k) => k + 1);
        return;
      }
      setIsDone(true);
      return;
    }

    if (index + 1 < LENGTHS.length) {
      setIndex(index + 1);
      setSectionKey((k) => k + 1);
    } else if (task === "forward") {
      setTask("break");
      setIndex(0);
      setSectionKey((k) => k + 1);
    } else {
      setIsDone(true);
    }
  };

  if (isDone) {
    const user = JSON.parse(localStorage.getItem("reflecta-user") || "{}");
    const resultToSave = {
      code: user.code,
      gender: user.gender,
      id: user.id,
      score: { forward: forwardScore, backward: backwardScore },
    };
    localStorage.setItem("result", JSON.stringify(resultToSave));
    localStorage.removeItem("reflecta-user");
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultToSave),
    }).finally(() => {
      localStorage.clear();
    });
    return (
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-2xl min-h-[300px] flex flex-col items-center justify-center space-y-4">
        <div className="text-xl font-bold">{t("test_finished")}</div>
        <div className="text-center">
          <p>
            {t("forward_score")}: {forwardScore}
          </p>
          <p>
            {t("backward_score")}: {backwardScore}
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

  if (task === "break") {
    return (
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-2xl min-h-[300px] flex flex-col items-center justify-center space-y-4">
        <p className="text-lg text-center">{t("rest_before_backward")}</p>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl transition duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600"
          onClick={() => setTask("backward")}
        >
          {t("continue")}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg min-h-[300px] flex items-center justify-center">
      <DigitTestSection
        key={sectionKey}
        length={LENGTHS[index]}
        count={2}
        mode={task}
        usedSequences={usedSequences.current}
        onFinish={handleFinish}
      />
    </div>
  );
}
