interface RapidApiQuestion {
  question: string;
  choices: string[];
  correctAnswer: string;
  explanation?: string;
}

interface RapidApiResponse {
  result: RapidApiQuestion[];
  cacheTime?: number;
  time?: number;
  status?: string;
  message?: string;
}

interface GenerateQuestionsParams {
  topic: string;
  numQuestions?: number;
  numChoices?: number;
  difficulty?: number;
  lang?: string;
  questionType?: string;
  skillLevel?: string;
  jobRole?: string;
  industry?: string;
}

export class RapidApiService {
  private static readonly BASE_URL =
    "https://generate-job-interview-questions-ai-quick-assess.p.rapidapi.com";
  private static readonly API_KEY =
    process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

  static async generateQuestions(
    params: GenerateQuestionsParams,
  ): Promise<RapidApiResponse> {
    const defaultParams = {
      numQuestions: 10,
      numChoices: 4,
      difficulty: 7,
      lang: "en",
      questionType: "multiple-choice",
      skillLevel: "intermediate",
      jobRole: "Developer",
      industry: "Software Development",
      ...params,
    };

    try {
      const response = await fetch(`${this.BASE_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host":
            "generate-job-interview-questions-ai-quick-assess.p.rapidapi.com",
          "x-rapidapi-key": this.API_KEY,
        },
        body: JSON.stringify(defaultParams),
      });

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error calling Rapid API:", error);
      throw error;
    }
  }
}

// Role to topic mapping
export const ROLE_TOPIC_MAPPING = {
  frontend: "JavaScript",
  backend: "REST APIs",
  devops: "Docker",
  "data analyst": "SQL",
} as const;

export const ROLE_DISPLAY_MAPPING = {
  frontend: "Frontend Developer",
  backend: "Backend Developer",
  devops: "DevOps Developer",
  "data analyst": "Data Analyst",
} as const;

export type MappedRole = keyof typeof ROLE_TOPIC_MAPPING;

// Utility function to convert API response to our flashcard format
export function convertApiResponseToFlashcards(
  apiResponse: RapidApiResponse,
  role: MappedRole,
): FlashcardQuestion[] {
  if (!apiResponse.result || !Array.isArray(apiResponse.result)) {
    throw new Error("Invalid API response: missing or invalid result array");
  }

  if (apiResponse.result.length === 0) {
    throw new Error("No questions received from API");
  }

  return apiResponse.result.map((question, index) => {
    if (
      !question.question ||
      !Array.isArray(question.choices) ||
      !question.correctAnswer
    ) {
      throw new Error(`Invalid question format at index ${index}`);
    }

    if (question.choices.length !== 4) {
      throw new Error(`Question ${index + 1} must have exactly 4 choices`);
    }

    if (!question.choices.includes(question.correctAnswer)) {
      throw new Error(
        `Question ${index + 1} correct answer not found in choices`,
      );
    }

    return {
      id: `${role}-${index + 1}`,
      role: role,
      question: question.question,
      options: question.choices.map((choice, choiceIndex) => ({
        id: String.fromCharCode(97 + choiceIndex), // 'a', 'b', 'c', 'd'
        text: choice,
        isCorrect: choice === question.correctAnswer,
      })),
      explanation: question.explanation || "No explanation provided.",
    };
  });
}

// Import types from our existing type definitions
import type { FlashcardQuestion } from "@/types";
