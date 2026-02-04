import type { Flashcards } from "@/types";
import Flashcard from "./Flashcard";

export default function FlashcardList({
  flashcards,
}: {
  flashcards: Flashcards;
}) {
  return (
    <div className="card-grid">
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
}
