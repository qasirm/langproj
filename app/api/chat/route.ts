// Import OpenAI library
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an instance of OpenAI with API Key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Specify the runtime environment
export const runtime = 'edge';

// Define the POST function
export async function POST(req: Request) {
  try {
    // Parse request body
    const { messages } = await req.json();

    // Validate messages
    if (!messages) {
      throw new Error('No messages provided in the request');
    }

    // Create a chat completion using OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
    });

    // Ensure response is valid
    if (!response) {
      throw new Error('Failed to get a response from OpenAI');
    }

    // Transform the response into a readable stream
    const stream = OpenAIStream(response);

    // Return a StreamingTextResponse
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Error handling with type checking
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in POST function:', errorMessage);
    return new Response(errorMessage, { status: 500 });
  }
}
