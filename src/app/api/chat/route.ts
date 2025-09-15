import { createVertex } from '@ai-sdk/google-vertex';
import {GoogleGenerativeAIProviderOptions} from '@ai-sdk/google'
import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from 'ai';
import { z } from 'zod';

const vertex = createVertex({
  project: 'prj-kokiri-dev', // optional
  location: 'us-central1', // optional
});

const options = {
  google: {
    // Options are nested under 'google' for Vertex provider
    thinkingConfig: {
      includeThoughts: true,
      // thinkingBudget: 2048, // Optional
    },
  } satisfies GoogleGenerativeAIProviderOptions,
}

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  try {
    const result = streamText({
      model: vertex('gemini-2.5-flash'),
      stopWhen: stepCountIs(5),
      tools: {
        // search: vertex.tools.googleSearch({}),
        weather: tool({
          description: 'Get the weather in a location (fahrenheit)',
          inputSchema: z.object({
            location: z.string().describe('The location to get the weather for'),
          }),
          execute: async ({ location }) => {
            const temperature = Math.round(Math.random() * (90 - 32) + 32);
            return {
              location,
              temperature,
            };
          },
        }),
        convertFahrenheitToCelsius: tool({
          description: 'Convert a temperature in fahrenheit to celsius',
          inputSchema: z.object({
            temperature: z
              .number()
              .describe('The temperature in fahrenheit to convert'),
          }),
          execute: async ({ temperature }) => {
            const celsius = Math.round((temperature - 32) * (5 / 9));
            return {
              celsius,
            };
          },
        }),
      },
      providerOptions: options,
      messages: convertToModelMessages(messages),
    });

    if (result.toolCalls && (await result.toolCalls).length > 0) {
      console.log('Tools were called:', result.toolCalls);
    }

    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
