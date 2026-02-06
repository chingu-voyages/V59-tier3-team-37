import { NextResponse } from "next/server";

const RAPIDAPI_HOST =
  "generate-job-interview-questions-ai-quick-assess.p.rapidapi.com";
const RAPIDAPI_URL = `https://${RAPIDAPI_HOST}/generate`;

type NormalizedQuestion = {
  question: string;
  choices: string[];
  correctAnswer: string;
};

function normalizeQuestions(raw: unknown): NormalizedQuestion[] {
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as { questions?: unknown[] })?.questions)
      ? (raw as { questions: unknown[] }).questions
      : Array.isArray((raw as { result?: unknown[] })?.result)
        ? (raw as { result: unknown[] }).result
        : [];

  return list.map((item: unknown) => {
    const o = item as Record<string, unknown>;
    const choices =
      (o.choices as string[] | undefined) ??
      (o.options as string[] | undefined) ??
      [];
    const correctAnswer =
      (o.correctAnswer as string | undefined) ??
      (o.correct_answer as string | undefined) ??
      (o.correct as string | undefined) ??
      "";
    return {
      question: String(o.question ?? ""),
      choices: Array.isArray(choices) ? choices.map(String) : [],
      correctAnswer: String(correctAnswer),
    };
  });
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "RAPIDAPI_KEY is not configured" },
        { status: 503 },
      );
    }

    const body = await request.json();

    if (!body.topic || !body.jobRole || !body.numQuestions) {
      return NextResponse.json(
        { error: "Missing required fields: topic, jobRole, numQuestions" },
        { status: 400 },
      );
    }

    const response = await fetch(RAPIDAPI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
      body: JSON.stringify({
        topic: body.topic,
        numQuestions: body.numQuestions ?? 8,
        numChoices: body.numChoices ?? 4,
        difficulty: body.difficulty ?? 6,
        lang: "en",
        questionType: "multiple-choice",
        skillLevel: body.skillLevel ?? "intermediate",
        jobRole: body.jobRole,
        industry: body.industry ?? "Software Development",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("RapidAPI error:", response.status, text);
      return NextResponse.json(
        { error: "API request failed", details: text.slice(0, 200) },
        { status: response.status >= 500 ? 502 : response.status },
      );
    }

    const data = (await response.json()) as unknown;
    const result = normalizeQuestions(
      (data as { result?: unknown }).result ??
        (data as { questions?: unknown }).questions ??
        data,
    );

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
