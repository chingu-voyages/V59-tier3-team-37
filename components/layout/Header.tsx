"use client";

import Image from "next/image";
import Link from "next/link";
import AuthPage from "../AuthModal";
import { useState } from "react";

export default function Header() {
  const [openAuthState, setOpenAuthState] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white dark:bg-black px-3.75 py-3.75 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      {/* Logo / App Name */}
      <div>
        <Link href="/">
          <Image
            src="/SkillPath.svg"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>
      {/* Navigation Links - evenly spaced */}
      <nav className="hidden md:flex flex-1 justify-center space-x-50 font-medium text-[#656568] text-sm">
        <Link href="#benefit" className="hover:text-primary-foreground">
          Benefit
        </Link>
        <Link href="#how-it-works" className="hover:text-primary-foreground">
          How it Works
        </Link>
        <Link href="#qa" className="hover:text-primary-foreground">
          Q&A
        </Link>
      </nav>
      {/* Login Button */}
      <div className="shrink-0 relative">
        <div className="-inset-1 rounded-full bg-[#3F1CD4] opacity-30 blur-xl z-0 cursor-pointer"></div>
        <Link
          href="/"
          onClick={() => setOpenAuthState(true)}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary-foreground hover:text-primary transition-colors"
        >
          Login Now
        </Link>
      </div>

      <AuthPage
        isOpen={openAuthState}
        onClose={() => setOpenAuthState(false)}
      />
    </header>
  );
}
