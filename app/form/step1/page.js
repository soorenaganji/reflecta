"use client";

import { useRouter } from "next/navigation";
import QuestionWrapper from "@/components/QuestionWrapper";
import { useEffect, useState } from "react";
import generateUserId from "@/utils/generateUserId";

const steps = [
  { key: "code", label: "What was your username from the former test?" },
  { key: "gender", label: "What is your gender?" },
];

export default function Step1() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("reflecta-user") || "{}");
    if (userData.code && userData.gender && userData.id) {
      router.replace("/form/step2");
    }
  }, [router]);
  const handleFinish = () => {
    const user = JSON.parse(localStorage.getItem("reflecta-user") || "{}");

    // Generate a unique 5-digit ID
    const userId = generateUserId();

    // Update user data with ID and save it to localStorage
    const updatedUser = { ...user, id: userId };
    localStorage.setItem("reflecta-user", JSON.stringify(updatedUser));

    // Redirect to step2
    router.push("/form/step2");
  };

  return (
    <QuestionWrapper steps={steps} onFinish={handleFinish}>
      {({ step, onNext, onSubmit }) => {
        if (step.key === "code") {
          return (
            <div className="space-y-3">
              <input
                type="text"
                className=" outline-none border px-4 py-2 w-full rounded focus:ring-2 focus:ring-indigo-600"
                onChange={(e) => {
                  onNext(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSubmit();
                  }
                }}
              />
            </div>
          );
        }

        if (step.key === "gender") {
          const genders = ["Male", "Female", "Prefer Not to Say", "non-binary"];

          return (
            <div className="space-y-2">
              {genders.map((gender) => (
                <button
                  key={gender}
                  onClick={() => {
                    setSelectedGender(gender);
                    onNext(gender);
                  }}
                  className={`w-full px-4 py-2 rounded-xl border text-center transition duration-200 focus:ring-2 focus:ring-indigo-600
                    ${
                      selectedGender === gender
                        ? "bg-white text-indigo-600 border-indigo-600 font-semibold"
                        : "bg-indigo-600 text-white border-transparent hover:bg-indigo-700"
                    }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          );
        }
      }}
    </QuestionWrapper>
  );
}
