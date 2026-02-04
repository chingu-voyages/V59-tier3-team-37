import z from "zod";

export const ROLES = {
  FRONTEND: "frontend",
  BACKEND: "backend",
  FULLSTACK: "fullstack",
  DESIGNER: "designer",
  DEVOPS: "devops",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const RoleSchema = z.enum([
  "frontend",
  "backend",
  "fullstack",
  "devops",
  "designer",
]);

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
  answer: string;
  options: AnswerOption[];
  explanation?: string;
}

export const FlashcardQuestionSchema = z.object({
  id: z.string(),
  role: RoleSchema,
  question: z.string(),
  answer: z.string(),
  options: z.array(AnswerOptionSchema).length(4),
  explanation: z.string().optional(),
});

export const FlashcardsSchema = z.array(FlashcardQuestionSchema);

export type Flashcards = z.infer<typeof FlashcardsSchema>;
