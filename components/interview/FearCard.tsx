import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface FearCardProps {
  title: ReactNode;       // <-- allow JSX
  description: string;
  
}

export function FearCard({ title, description }: FearCardProps) {
  return (
    <Card className="relative rounded-xl border shadow-sm hover:shadow-md transition">
      
      {/* Flag image */}
      <Image
        src="/problems.svg"  // your flag in /public
        alt="flag"
        width={70}
        height={70}
        className="absolute top-4 right-4"
      />

      <CardContent className="p-4 text-left">
        <h3 className="font-semibold text-lg mb-2 text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-[#39393B] leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
