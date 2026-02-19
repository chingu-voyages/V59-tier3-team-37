"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import AuthPage from "../AuthModal";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [openAuthState, setOpenAuthState] = useState(false);
  const [activeSection, setActiveSection] = useState("benefit");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  // Observe Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Intersection observer for section highlighting
  useEffect(() => {
    const sections = ["benefit", "how-it-works", "qa"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:bg-black px-3.75 py-3.75 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      {/* Logo */}
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

      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-1 justify-center gap-16 font-medium text-sm relative">
        {[
          { label: "Benefit", id: "benefit" },
          { label: "How it Works", id: "how-it-works" },
          { label: "Q&A", id: "qa" },
        ].map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() =>
              document
                .getElementById(item.id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className={`relative pb-2 transition-colors ${
              activeSection === item.id
                ? "text-black"
                : "text-[#656568] hover:text-black"
            }`}
          >
            {item.label}
            <span
              className={`absolute left-0 bottom-0 h-[2px] bg-[#3F1CD4] transition-all duration-300 ${
                activeSection === item.id ? "w-full" : "w-0"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Mobile: Hamburger left, Login/Avatar right */}
      <div className="flex justify-between items-center w-full md:hidden">
        {/* Hamburger */}
        <button type="button" onClick={() => setOpenMobileMenu(true)}>
          <Menu size={24} />
        </button>

        {/* Login / Avatar */}
        {!user ? (
          <button
            type="button"
            onClick={() => setOpenAuthState(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary-foreground hover:text-primary transition-colors"
          >
            Login
          </button>
        ) : (
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-600"
          >
            <Image
              src="/avatar-placeholder.png"
              alt="User avatar"
              width={40}
              height={40}
              className="object-cover"
            />
          </button>
        )}
      </div>

      {/* Auth Modal */}
      <AuthPage
        isOpen={openAuthState}
        onClose={() => setOpenAuthState(false)}
      />

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
        user={user}
        onLoginClick={() => setOpenAuthState(true)}
      />
    </header>
  );
}
