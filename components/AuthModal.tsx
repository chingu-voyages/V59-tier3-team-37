"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "signup" | "login"; // new prop to control initial tab
}

export default function AuthModal({
  isOpen,
  onClose,
  initialTab,
}: AuthModalProps) {
  const router = useRouter();

  // useState now defaults to initialTab
  const [activeTab, setActiveTab] = useState<"signup" | "login">(
    initialTab || "signup",
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Reset tab whenever modal opens
  useEffect(() => {
    if (!isOpen) return;

    // Schedule the state update after render to avoid cascading renders
    const timer = setTimeout(() => {
      setActiveTab(initialTab || "signup");
    }, 0);

    return () => clearTimeout(timer);
  }, [isOpen, initialTab]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (activeTab === "signup") {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: username,
      });

      alert("Account created!");
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in!");
    }

    onClose();
    router.push("/dashboard");
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-zinc-100 rounded-2xl p-8 shadow-xl relative">
        {/* Close button */}
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-500 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/SkillPath.svg"
            alt="Logo"
            width={160}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-zinc-200 rounded-full p-1 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "signup"
                ? "bg-white shadow text-black"
                : "text-zinc-500"
            }`}
          >
            Sign up
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "login"
                ? "bg-white shadow text-black"
                : "text-zinc-500"
            }`}
          >
            Log in
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-6">
          {activeTab === "signup"
            ? "Create an account to start your learning journey"
            : "Welcome back"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "signup" && (
            <div>
              <label htmlFor="username" className="text-sm text-zinc-600">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="text-sm text-zinc-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-zinc-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl mt-4 hover:opacity-90 transition"
          >
            {activeTab === "signup" ? "Sign up" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
