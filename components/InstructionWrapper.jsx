"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function InstructionWrapper({ steps, onFinish, children }) {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const currentStep = steps[current];

  const handleNext = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish();
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-2xl space-y-4">
      <div className="text-lg font-semibold">{currentStep.label}</div>

      {/* Render current step content */}
      {children({ step: currentStep, onNext: handleNext })}

      {/* Navigation buttons */}
      <div className="w-full flex items-center justify-between">
        {current > 0 ? (
          <button
            className="p-2 bg-gray-300 text-gray-700 rounded-xl transition duration-200 hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
            onClick={handlePrevious}
          >
            {t("previous")}
          </button>
        ) : (
          <div /> // Empty space to keep layout consistent
        )}
        <button
          className="p-2 bg-indigo-600 text-white rounded-xl transition duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600"
          onClick={handleNext}
        >
          {current < steps.length - 1 ? t("next") : t("finish")}
        </button>
      </div>
    </div>
  );
}
