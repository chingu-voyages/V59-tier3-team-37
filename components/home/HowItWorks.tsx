"use client";

import Image from "next/image";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="
    scroll-mt-24
    w-full py-24
    bg-gradient-to-b
    from-white from-5%
    via-[#7364F4]/5 via-50%
    to-white to-95%
  "
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-12">
            Simplify your practicing
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 font-semibold">
                01
              </div>
              <div>
                <h3 className="font-semibold text-lg">Pick a Role</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Choose your role (Frontend, Backend, DevOps, Designer,
                  Fullstack) to get relevant questions.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 font-semibold">
                02
              </div>
              <div>
                <h3 className="font-semibold text-lg">Answer Questions</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Go through randomized flashcards and select the correct
                  answers. Learn as you go!
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 font-semibold">
                03
              </div>
              <div>
                <h3 className="font-semibold text-lg">Track Your Progress</h3>
                <p className="text-gray-500 text-sm mt-1">
                  See which questions you got right or wrong, and improve over
                  time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/flashcardsmodel.png"
            alt="Flashcard preview"
            width={500}
            height={500}
            className="w-full max-w-md object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
