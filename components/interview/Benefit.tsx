"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function BenefitsSection() {
  return (
    <section
      id="benefit"
      className="
    scroll-mt-24
    w-full py-24
    bg-gradient-to-b
    from-white from-5%
    via-[#7364F4]/20 via-50%
    to-white to-95%
  "
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Benefits</h2>
          <p className="text-[#39393B] max-w-xl mx-auto">
            Everything is built to help you master the skill.
            <br /> Our AI analyzes job descriptions and roles to
            <br /> generate the specific, curveball questions you
            <br /> need to practice.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[140px] max-w-5xl mx-auto">
          {/* Card 1 - wide */}
          <Card className="md:col-span-2 bg-[#DCD9FD] border-0">
            <CardContent className="h-full flex items-center justify-between p-10">
              <p className="text-lg font-semibold text-[#130554]">
                Get Instant <br /> feedback anytime
              </p>
              <div className="flex flex-col leading-none">
                <Image
                  src="/EmojiLaughing.svg"
                  alt="Smiley"
                  width={60}
                  height={50}
                  className="-ml-8"
                />

                <Image
                  src="/smiley-1.svg"
                  alt="OK"
                  width={40}
                  height={40}
                  className="ml-5 -mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-[#958BF8] border-0">
            <CardContent className="h-full flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Logo Icon"
                width={200}
                height={200}
                className="object-contain"
              />
            </CardContent>
          </Card>
          {/* Card 3 */}
          <Card className="bg-[#958BF8] border-0">
            <CardContent className="relative h-full flex items-start p-6 text-white">
              {/* Top-right text */}
              <p className="absolute top-2 right-6 text-lg opacity-80">
                hiring rate
              </p>

              {/* Image stays left */}
              <Image
                src="/eightyperc.svg"
                alt="eighty-percent"
                width={150}
                height={150}
                className="object-contain mt-6"
              />
            </CardContent>
          </Card>

          {/* Card 4 - wide */}
          <Card className="md:col-span-2 bg-purple-200/70 border-0 overflow-visible">
            <CardContent className="relative h-full flex items-center p-6">
              <p className="text-lg font-semibold max-w-sm text-[#130554]">
                AI generates questions that
                <br /> probe for nuance and detail
              </p>

              <Image
                src="/AI star.svg"
                alt="3D star"
                width={160}
                height={160}
                className="absolute -right-6 -top-10  object-contain"
              />
            </CardContent>
          </Card>

          {/* Card 5 - wide */}
          <Card className="md:col-span-2 bg-[#DCD9FD] border-0">
            <CardContent className="h-full flex items-center justify-between p-10">
              <p className="text-lg font-semibold text-[#130554]">
                Keep practicing
                <br /> and gain confidence
              </p>
              <div className="flex flex-col leading-none">
                <Image
                  src="/medalBig.svg"
                  alt="Smiley"
                  width={120}
                  height={100}
                  className="-ml-8"
                />

                <Image
                  src="/medalSmall.svg"
                  alt="OK"
                  width={40}
                  height={40}
                  className="ml-8 -mt-7"
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 6 */}
          <Card className="bg-[#958BF8] border-0 relative overflow-hidden">
            <CardContent className="h-full p-4 relative">
              {/* Top-left text */}
              <p className="absolute -top-2 left-4 text-white text-lg font-medium">
                Track your
                <br /> mistakes
              </p>

              {/* Centered loading image */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="relative w-[200px] h-[100px]">
                  <Image
                    src="/progressbar.png"
                    alt="loading part 1"
                    width={400}
                    height={200}
                    className="absolute top-5 "
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
