"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import Image from "next/image";
import logo from "@/public/logo.PNG"; // اگر لوگو داری همین‌جا بذار

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex flex-col items-center justify-center px-2 py-8">
      {/* لوگو */}
      <Image
        src={logo}
        alt="Reflecta Logo"
        width={120}
        height={48}
        className="mb-8"
        priority
      />

      {/* باکس مرکزی */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-indigo-100 p-6 md:p-10 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-700 mb-3 text-center">
          {t("beforeStartTitle")}
        </h2>
        <p className="text-base md:text-lg text-slate-600 mb-8 text-center leading-relaxed">
          {t("beforeStartDescription")}
        </p>
        <Link
          href={"/form"}
          className="bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 px-10 py-4 rounded-xl text-lg transition duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 w-full text-center"
        >
          {t("getStarted")}
        </Link>
      </div>
      {/* Copyright */}
      <div className="mt-8 text-xs text-slate-400 text-center">
        © {new Date().getFullYear()} Reflecta
      </div>
    </div>
  );
}
