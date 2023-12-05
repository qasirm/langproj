import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import data from '@/db.json'; // Ensure this path is correct

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
    const { messages } = requestBody;

    if (!messages) {
      throw new Error('No messages provided in the request');
    }

    // Fetch the current lesson ID from your database
    const currentLessonResponse = await fetch('http://localhost:3002/currentLesson');
    const currentLessonData = await currentLessonResponse.json();
    const currentLessonId = currentLessonData.id;

    // Fetch the selected language from your database
    const languageResponse = await fetch('http://localhost:3002/selectedLanguage');
    const languageData = await languageResponse.json();
    const selectedLanguage = languageData.current;

    // Fetch the lesson details based on the currentLessonId from db.json
    const lessonData = data.lessons.find(lesson => lesson.id === currentLessonId);
    if (!lessonData) {
      throw new Error('Lesson not found');
    }

    // Construct the system message
    const systemMessage = {
      role: 'system',
      content: `Act as a conversational language tutor specializing in ${selectedLanguage}. Your primary goal is to guide users through an interactive lesson focusing on ${languageData.title}, helping them ${languageData.content}. You should initiate each tutoring session by directly introducing a phrase or concept related to ${languageData.title} without asking open-ended questions like "How can I assist you?"

      Your responses should be tailored to beginners and have no proficiency in ${selectedLanguage}. Begin each lesson with a clear and engaging introduction of yourself as their language tutor and promptly dive into the lesson material (Assume the user does not understand the other language). If the user does not understand something or asks for clarification, immediately provide an explanation in both ${selectedLanguage} and in English with the English in parentheses.
      
      For instance, if a user wants to learn about numbers in ${selectedLanguage}, start by introducing the numbers directly and then engage them in an exercise or a practical application of what they've learned.`,
    };

    messages.unshift(systemMessage);

    // Create a chat completion using OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
    });

    if (!response) {
      throw new Error('Failed to get a response from OpenAI');
    }

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in POST function:', errorMessage);
    return new Response(errorMessage, { status: 500 });
  }
}
