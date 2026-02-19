"use client";

import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  user: User | null;
}

export default function MobileMenu({
  isOpen,
  onClose,
  onLoginClick,
  user,
}: MobileMenuProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex">
      {/* Sidebar panel */}
      <div className="bg-white w-64 h-full p-6 relative flex flex-col">
        {/* Close button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-lg font-bold"
          onClick={onClose}
        >
          X
        </button>

        {/* Menu links */}
        <nav className="flex flex-col gap-4 mt-12">
          <button
            type="button"
            onClick={() => {
              document
                .getElementById("benefit")
                ?.scrollIntoView({ behavior: "smooth" });
              onClose();
            }}
            className="text-left text-gray-700 hover:text-purple-600 font-medium"
          >
            Benefit
          </button>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" });
              onClose();
            }}
            className="text-left text-gray-700 hover:text-purple-600 font-medium"
          >
            How it Works
          </button>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("qa")
                ?.scrollIntoView({ behavior: "smooth" });
              onClose();
            }}
            className="text-left text-gray-700 hover:text-purple-600 font-medium"
          >
            Q&A
          </button>
        </nav>

        {/* Bottom: login or dashboard */}
        <div className="mt-auto">
          {!user ? (
            <button
              type="button"
              onClick={() => {
                onLoginClick();
                onClose();
              }}
              className="w-full py-3 px-4 bg-purple-600 text-white rounded-xl mt-4 hover:bg-purple-700 transition"
            >
              Login
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                router.push("/dashboard");
                onClose();
              }}
              className="w-full py-3 px-4 bg-gray-200 rounded-xl mt-4 hover:bg-gray-300 transition"
            >
              Dashboard
            </button>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      <button
  type="button"
  className="flex-1 bg-transparent border-none p-0 m-0"
  onClick={onClose}
  aria-label="Close menu"
></button>

    </div>
  );
}
