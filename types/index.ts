import z from "zod";

export const RoleSchema = z.enum([
  "frontend",
  "backend",
  "fullstack",
  "devops",
  "designer",
  "scrum master",
  "python developer",
  "ui/ux designer",
  "web developer",
]);

export type Role = z.infer<typeof RoleSchema>;
export interface AnswerOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export const AnswerOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean().optional(),
});

export interface FlashcardQuestion {
  id: string;
  role: Role;
  question: string;
  options: AnswerOption[];
  explanation?: string;
}

export const FlashcardQuestionSchema = z.object({
  id: z.string(),
  role: RoleSchema,
  question: z.string(),
  options: z.array(AnswerOptionSchema).length(4),
  explanation: z.string().optional(),
});

export const FlashcardsSchema = z.array(FlashcardQuestionSchema);

export type Flashcards = z.infer<typeof FlashcardsSchema>;
