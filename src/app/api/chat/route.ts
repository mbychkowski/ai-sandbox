import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const MODEL_NAME = 'gemini-1.5-flash';

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not found' }, { status: 500 });
    }

    if (!messages) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const lastMessage = messages[messages.length - 1];

    // TODO: Save user message to DB
    // TODO: Save model response to DB

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: messages.slice(0, -1).map((msg: any) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ content: text, role: 'model' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
