"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { Menu, User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import AuthPage from "../AuthModal";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [openAuthState, setOpenAuthState] = useState(false);
  const [activeSection, setActiveSection] = useState("benefit");
  const [user, setUser] = useState<User | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [authTab, setAuthTab] = useState<"signup" | "login">("signup");

  // Observe Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Intersection observer
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

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:bg-black px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/SkillPath.svg"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-16 font-medium text-sm">
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

        {/* Desktop Login / Avatar */}
        <div className="hidden md:flex items-center">
          {!user ? (
            <button
              type="button"
              onClick={() => {
                setAuthTab("login");
                setOpenAuthState(true);
              }}
              className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              Login
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center border-2 border-purple-600"
            >
              <UserIcon size={40} className="text-purple-600" />
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button type="button" onClick={() => setOpenMobileMenu(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthPage
        isOpen={openAuthState}
        onClose={() => setOpenAuthState(false)}
        initialTab={authTab}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
        user={user}
        onLoginClick={() => setOpenAuthState(true)}
      />
    </header>
  );
}
