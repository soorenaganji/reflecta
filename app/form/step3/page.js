"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import generateUniqueDigitNumber from "@/utils/randomNumberGenerator";
import toast from "react-hot-toast";
import { useLanguage } from "@/components/LanguageProvider";
export default function Step3() {
  const [phase, setPhase] = useState("intro"); // 'intro', 'ready', 'show', 'input', 'done'
  const [number, setNumber] = useState([]);
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(""); // string: "" | "Correct" | "Wrong"
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (phase === "ready") {
      const num = generateUniqueDigitNumber(2);
      setNumber(num);
      setCurrentDigitIndex(0);
      setPhase("show");
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "show" && currentDigitIndex < number.length) {
      const timer = setTimeout(() => {
        setCurrentDigitIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (phase === "show" && currentDigitIndex === number.length) {
      const timer = setTimeout(() => {
        setPhase("input");
      }, 500);
      return () => clearTimeout(timer);
    }

    // اگر feedback وجود داشت و فاز input است، بعد از دو ثانیه ببر سراغ done
    if (phase === "input" && feedback) {
      const timer = setTimeout(() => {
        setPhase("done");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, currentDigitIndex, number, feedback]);

  const handleSubmit = () => {
    if (userInput === number.join("")) {
      setFeedback("Correct");
      toast.success(t("correct"));
    } else {
      setFeedback("Wrong");
      toast.error(t("wrong"));
    }
    // فاز رو تغییر نمی‌دیم تا کاربر input و feedback رو همزمان ببینه
  };

  const renderContent = () => {
    switch (phase) {
      case "intro":
        return (
          <div className="space-y-4 text-center">
            <h1 className="text-xl font-bold">{t("memorize_digits_title")}</h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setPhase("ready")}
            >
              {t("start")}
            </button>
          </div>
        );
      case "ready":
        return <h2 className="text-center text-lg">{t("get_ready")}</h2>;
      case "show":
        return (
          <h1 className="text-center text-4xl font-mono">
            {number[currentDigitIndex]}
          </h1>
        );
      case "input":
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-lg">{t("number_question")}</h2>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              className="  border px-4 py-2 rounded w-full text-center focus:ring-2 focus:ring-indigo-600"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              disabled={!!feedback}
            />
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl transition duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600"
              onClick={handleSubmit}
              disabled={!!feedback}
            >
              {t("continue")}
            </button>
          </div>
        );
      case "done":
        return (
          <div className="space-y-4 text-center">
            <p className="text-lg">
              {t("training_done")}
              <br />
              {t("training_concentration")}
            </p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-xl transition duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-600"
              onClick={() => router.push("/form/step4")}
            >
              {t("start_test")}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-2xl min-h-[300px] flex items-center justify-center">
      {renderContent()}
    </div>
  );
}
