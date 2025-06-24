"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function QuestionWrapper({ steps, onFinish, children }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const { t } = useLanguage();

  const currentStep = steps[current];
  const currentAnswer = answers[currentStep.key];

  const handleAnswer = (value) => {
    const updated = { ...answers, [currentStep.key]: value };
    setAnswers(updated);
  };

  const handleNext = () => {
    if (!currentAnswer) return; // جلوگیری از ادامه بدون جواب
    localStorage.setItem("reflecta-user", JSON.stringify(answers));
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-2xl space-y-4">
      <div className="text-lg font-semibold">{currentStep.label}</div>

      {children({ step: currentStep, onNext: handleAnswer, onSubmit: handleNext })}

      <div className="w-full px-8 py-4 flex items-center justify-end">
        <button
          className={`p-2 rounded-xl transition duration-200 focus:ring-2 focus:ring-indigo-600 ${
            currentAnswer
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!currentAnswer}
          onClick={handleNext}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}
