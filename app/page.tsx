"use client";

import Image from "next/image";

import AuthModal from "@/components/AuthModal";

// import ThemeToggle from "@/components/custom/theme/ThemeToggle";

import { useState } from "react";
import FAQ from "@/components/faqs/Faqs";
import HowItWorks from "@/components/home/HowItWorks";
import BenefitsSection from "@/components/interview/Benefit";
import InterviewFears from "@/components/interview/InterviewFear";
import { Body2, HeadlineXL } from "@/components/typography";

export default function HeroSection() {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-white from-5% via-[#7364F4]/60 via-50% to-white to-95% pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16">
            {/* Main Heading */}
            <HeadlineXL className="text-black mb-6 leading-tight">
              Dedicated space to hone your
              <br />
              skills powered by AI.
            </HeadlineXL>
            {/* Subheading */}
            <Body2 className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              Everything you need is in one place, so you can focus on{" "}
              <span className="font-semibold">
                mastering <br />
              </span>
              your narrative, building your confidence, and securing your{" "}
              <span className="font-semibold">next great opportunity.</span>
            </Body2>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => setOpenAuth(true)}
              className="inline-block px-8 py-4 bg-linear-to-b from-[#7364F4] to-purple-400 hover:from-[#6354E4] hover:to-purple-500 text-white text-lg font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Started • it&apos;s free
            </button>
          </div>

          {/* Content Card */}
          <div className="w-full max-w-5xl mx-auto">
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src="/Dashboardshot.png"
                alt="Showcase image"
                width={1200}
                height={800}
                className="rounded-2xl object-cover w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <InterviewFears />
      <BenefitsSection />
      <HowItWorks />
      <FAQ />

      {/* Auth Modal */}
      <AuthModal
  isOpen={openAuth}
  onClose={() => setOpenAuth(false)}
  initialTab="signup"
/>
    </>
  );
}
