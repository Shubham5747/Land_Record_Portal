import OpenAI from "openai";
import { NextResponse } from "next/server";

const MAX_MESSAGE_LENGTH = 2_000;

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("message" in body) ||
      typeof body.message !== "string"
    ) {
      return NextResponse.json(
        { error: "A message is required." },
        { status: 400 }
      );
    }

    const message = body.message.trim();

    if (!message || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      return NextResponse.json(
        { error: "The AI assistant is not configured." },
        { status: 503 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.responses.create({
      model: "gpt-5",
      instructions:
        "You are a land-record information assistant. Give concise, factual guidance. Do not claim to provide legal advice or invent record details. Direct users to the relevant land-record authority when official verification is required.",
      input: message,
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json(
      { error: "The assistant could not process the request." },
      { status: 500 }
    );
  }
}
