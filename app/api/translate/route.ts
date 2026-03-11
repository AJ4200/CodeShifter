import { TranslateBody } from "@/types/types";
import { createPrompt } from "@/utils";
import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const runtime = "edge";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request): Promise<Response> {
  try {
    const { inputLanguage, outputLanguage, inputCode, model } =
      (await req.json()) as TranslateBody;

    const prompt = createPrompt(inputLanguage, outputLanguage, inputCode);

    const result = await streamText({
      model: groq(model),
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
