"use client";

import { useEffect } from "react";
import FlashcardList from "@/components/flashcard/FlashcardList";
import { useSessionStore } from "@/store/useSessionStore";

const ActualFlashCards = () => {
  const { flashcards, loadFlashcards } = useSessionStore();

  useEffect(() => {
    loadFlashcards();
  }, [loadFlashcards]);
  return <FlashcardList flashcards={flashcards} />;
};

export default ActualFlashCards;
