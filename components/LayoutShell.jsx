"use client";
import { useLanguage } from "./LanguageProvider";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.PNG";

export default function LayoutShell({ children }) {
  const { lang, setLang } = useLanguage();
  return (
    <>
      <Toaster />
      <div>
        <header className="flex items-center justify-between px-1 py-4 h-16 shadow-lg">
          <Link href="/">
            <Image src={logo} width={120} height={60} alt="logo" />
          </Link>
          <div className="flex items-center justify-center mr-2">
            <div className="flex bg-gray-100 rounded-lg px-1 py-0.5 shadow-inner">
              <button
                onClick={() => setLang("it")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition 
            ${
              lang === "it"
                ? "bg-indigo-500 text-white shadow font-bold"
                : "text-gray-500 hover:text-indigo-600"
            }`}
              >
                IT
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition 
            ${
              lang === "en"
                ? "bg-indigo-500 text-white shadow font-bold"
                : "text-gray-500 hover:text-indigo-600"
            }`}
              >
                EN
              </button>
            </div>
          </div>
        </header>
        <div className="">{children}</div>
        <footer></footer>
      </div>
    </>
  );
}
