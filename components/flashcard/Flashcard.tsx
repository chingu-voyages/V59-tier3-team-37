"use client";

import { useEffect, useRef, useState } from "react";
import type { FlashcardQuestion } from "@/types";

export default function Flashcard({
  flashcard,
}: {
  flashcard: FlashcardQuestion;
}) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState<number | string>("initial");

  const frontEl = useRef<HTMLDivElement | null>(null);
  const backEl = useRef<HTMLDivElement | null>(null);

  function setMaxHeight() {
    if (!frontEl.current || !backEl.current) return;
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, []);
  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, [setMaxHeight]);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map(({ text }) => {
            return (
              <div className="flashcard-option" key={text}>
                {text}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {flashcard.answer}
      </div>
    </div>
  );
}
