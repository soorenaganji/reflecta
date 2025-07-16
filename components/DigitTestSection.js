import { useEffect, useState } from "react";
import generateUniqueDigitNumber from "@/utils/randomNumberGenerator";
import toast from "react-hot-toast";
import { useLanguage } from "@/components/LanguageProvider";

export default function DigitTestSection({
  length,
  count,
  onFinish,
  direction = "forward",
  generateSequence = generateUniqueDigitNumber,
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [numberArray, setNumberArray] = useState([]);
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [phase, setPhase] = useState("intro"); // intro > ready > show > input
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const { t } = useLanguage();

  // شروع سوال جدید: فاز رو ببر به intro
  useEffect(() => {
    if (phase === "ready") {
      const num = generateSequence(length);
      setNumberArray(num);
      setCurrentDigitIndex(0);
      setUserInput("");
      setFeedback("");
      setPhase("show");
    }
  }, [phase, length, questionIndex, generateSequence]);

  // ترتیب نمایش پیام‌ها قبل از شروع سوال جدید
  useEffect(() => {
    if (phase === "intro") {
      const timer1 = setTimeout(() => setPhase("memorize"), 100);
      return () => clearTimeout(timer1);
    }
    if (phase === "memorize") {
      const timer2 = setTimeout(() => setPhase("getready"), 1000);
      return () => clearTimeout(timer2);
    }
    if (phase === "getready") {
      const timer3 = setTimeout(() => setPhase("ready"), 1000);
      return () => clearTimeout(timer3);
    }
  }, [phase]);

  // نمایش رقم به رقم
  useEffect(() => {
    if (phase === "show") {
      if (currentDigitIndex < numberArray.length) {
        const timer = setTimeout(() => {
          setCurrentDigitIndex((prev) => prev + 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setPhase("input"), 500);
      }
    }
  }, [phase, currentDigitIndex, numberArray]);

  // پیام و رفتن به سوال بعدی یا اتمام بخش
  useEffect(() => {
    if (phase === "input" && feedback) {
      const timer = setTimeout(() => {
        const increment = feedback === "Correct" ? 1 : 0;
        const newScore = score + increment;
        if (questionIndex + 1 < count) {
          setScore(newScore);
          setQuestionIndex((q) => q + 1);
          setFeedback("");
          setPhase("intro");
        } else {
          onFinish(newScore);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, feedback, questionIndex, count, score, onFinish]);

  // چک جواب کاربر
  const handleSubmit = () => {
    const correct =
      direction === "forward"
        ? numberArray.join("")
        : numberArray.slice().reverse().join("");

    if (userInput === correct) {
      setFeedback("Correct");
      toast.success(t("correct"));
    } else {
      setFeedback("Wrong");
      toast.error(t("wrong"));
    }
  };

  // نمایش محتوا
  if (phase === "intro") {
    return (
      <div className="flex items-center justify-center h-[150px] text-xl font-bold">
        {t("memorize_digits")}
      </div>
    );
  }
  if (phase === "memorize") {
    return (
      <div className="flex items-center justify-center h-[150px] text-xl font-bold">
        {t("memorize_digits")}
      </div>
    );
  }
  if (phase === "getready") {
    return (
      <div className="flex items-center justify-center h-[150px] text-lg font-bold">
        {t("get_ready")}
      </div>
    );
  }
  if (phase === "show") {
    return (
      <h1 className="text-center text-4xl font-mono h-[60px]">
        {currentDigitIndex < numberArray.length
          ? numberArray[currentDigitIndex]
          : null}
      </h1>
    );
  }
  if (phase === "input") {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-lg">{t("number_question")}</h2>
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min="0"
          className=" outline-none border px-4 py-2 rounded w-full text-center focus:border-indigo-600 transition-all duration-200"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          disabled={!!feedback}
          autoFocus
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
  }
  return null;
}
