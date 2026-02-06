import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.topic || !body.jobRole || !body.numQuestions) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await fetch(
      "https://generate-job-interview-questions-ai-quick-assess.p.rapidapi.com/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
          "X-RapidAPI-Host":
            "generate-job-interview-questions-ai-quick-assess.p.rapidapi.com",
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
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "API request failed" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
