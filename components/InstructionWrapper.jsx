"use client";

import { useState } from "react";

export default function InstructionWrapper({ steps, onFinish, children }) {
  const [current, setCurrent] = useState(0);

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
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg space-y-4">
      <div className="text-lg font-semibold">{currentStep.label}</div>

      {/* Render current step content */}
      {children({ step: currentStep, onNext: handleNext })}

      {/* Navigation buttons */}
      <div className="w-full flex items-center justify-between">
        {current > 0 ? (
          <button
            className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={handlePrevious}
          >
            Previous
          </button>
        ) : (
          <div /> // Empty space to keep layout consistent
        )}
        <button
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleNext}
        >
          {current < steps.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
}
