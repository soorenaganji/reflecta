"use client";

import { useRouter } from "next/navigation";
import QuestionWrapper from "@/components/QuestionWrapper";
import { useEffect, useState } from "react";
import generateUserId from "@/utils/generateUserId";

const steps = [
  { key: "age", label: "How old are you?" },
  { key: "gender", label: "What is your gender?" },
];

export default function Step1() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("reflecta-user") || "{}");
    if (userData.age && userData.gender && userData.id) {
      router.replace("/form/step2");
    }
  }, [router]);
  const handleFinish = () => {
    const user = JSON.parse(localStorage.getItem('reflecta-user') || '{}')
  
    // Generate a unique 5-digit ID
    const userId = generateUserId()
  
    // Update user data with ID and save it to localStorage
    const updatedUser = { ...user, id: userId }
    localStorage.setItem('reflecta-user', JSON.stringify(updatedUser))
  
    // Redirect to step2
    router.push('/form/step2')
  }
  
  return (
    <QuestionWrapper steps={steps} onFinish={handleFinish}>
      {({ step, onNext }) => {
        if (step.key === "age") {
          return (
            <div className="space-y-3">
              <input
                type="number"
                className="border px-4 py-2 w-full rounded"
                onChange={(e) => onNext(e.target.value)}
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
                  className={`w-full px-4 py-2 rounded border text-center
                    ${
                      selectedGender === gender
                        ? "bg-white text-blue-600 border-blue-600 font-semibold"
                        : "bg-blue-600 text-white border-transparent"
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
