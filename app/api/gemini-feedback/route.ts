import { NextResponse } from "next/server";
import type { FlashcardQuestionWithAnswer } from "@/types";

export async function POST(request: Request) {
  try {
    const { selectedAnswers } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 },
      );
    }

    // Format the data for Gemini
    const formattedAnswers = selectedAnswers.map(
      (answer: FlashcardQuestionWithAnswer) => {
        const correctOption = answer.options.find((opt) => opt.isCorrect);
        const selectedOption = answer.options.find(
          (opt) => opt.id === answer.selectedOptionId,
        );
        const isCorrect = selectedOption?.id === correctOption?.id;

        return {
          question: answer.question,
          role: answer.role,
          selectedAnswer: selectedOption?.text || "Not answered",
          correctAnswer: correctOption?.text || "",
          isCorrect,
        };
      },
    );

    type FormattedAnswer = {
      question: string;
      role: string;
      selectedAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    };

    const correctCount = formattedAnswers.filter(
      (a: FormattedAnswer) => a.isCorrect,
    ).length;
    const totalCount = formattedAnswers.length;

    const prompt = `You are a career coach analyzing a tech quiz performance. The user answered ${correctCount} out of ${totalCount} questions correctly.

Here are their answers:
${formattedAnswers
  .map(
    (a: FormattedAnswer, idx: number) => `
${idx + 1}. Question: ${a.question}
   Role: ${a.role}
   Their answer: ${a.selectedAnswer}
   Correct answer: ${a.correctAnswer}
   Status: ${a.isCorrect ? "✓ Correct" : "✗ Incorrect"}
`,
  )
  .join("\n")}

Provide a brief, encouraging 2-3 sentence summary of their performance, followed by a concise bulleted list of 3-4 specific areas they should focus on improving (based on the questions they got wrong and the roles they struggled with). Keep the tone supportive and actionable. Be direct and concise.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get feedback from Gemini" },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log({
      data,
    });

    const feedback =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Unable to generate feedback.";

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Error in gemini-feedback route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
