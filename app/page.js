"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="px-2 pt-4">
      <h2 className="text-xl font-extrabold">{t("beforeStartTitle")}</h2>
      <p className="mt-12 mb-24">{t("beforeStartDescription")}</p>
      <div className="flex items-center justify-center">
        <Link
          href={"/form"}
          className="bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-200 px-12 py-6 mx-auto rounded-xl transition duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600"
        >
          {t("getStarted")}
        </Link>
      </div>
    </div>
  );
}
