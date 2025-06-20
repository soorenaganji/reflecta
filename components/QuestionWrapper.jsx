"use client";

import { useState } from "react";

export default function QuestionWrapper({ steps, onFinish, children }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

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
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg space-y-4">
      <div className="text-lg font-semibold">{currentStep.label}</div>

      {children({ step: currentStep, onNext: handleAnswer })}

      <div className="w-full px-8 py-4 flex items-center justify-end">
        <button
          className={`p-2 rounded-xl transition ${
            currentAnswer
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!currentAnswer}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
