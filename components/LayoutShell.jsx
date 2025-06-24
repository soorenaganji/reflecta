'use client';
import { useLanguage } from './LanguageProvider';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.PNG';

export default function LayoutShell({ children }) {
  const { lang, setLang } = useLanguage();
  return (
    <>
      <Toaster />
      <div>
        <header className="flex items-center justify-between px-1 py-4 h-16 shadow-lg mb-16">
          <Link href="/">
            <Image src={logo} width={160} height={60} alt="logo" />
          </Link>
          <button
            className="px-2 py-1 border rounded"
            onClick={() => setLang(lang === 'en' ? 'it' : 'en')}
          >
            {lang === 'en' ? 'IT' : 'EN'}
          </button>
        </header>
        <div className="px-3">{children}</div>
        <footer></footer>
      </div>
    </>
  );
}
