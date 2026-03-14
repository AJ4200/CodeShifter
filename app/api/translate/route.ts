import { TranslateBody } from "../../types/types";
import { createPrompt } from "../../utils";
import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";

export const runtime = "edge";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request): Promise<Response> {
  try {
    const { inputLanguage, outputLanguage, inputCode, model } =
      (await req.json()) as TranslateBody;

    const prompt = createPrompt(inputLanguage, outputLanguage, inputCode);

    const result = await generateText({
      model: groq(model),
      prompt,
      temperature: 0,
    });

    const text = result.text?.trim();
    if (!text) {
      return new Response("Empty response from model.", { status: 502 });
    }

    return new Response(text, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
