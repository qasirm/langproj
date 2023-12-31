"use client";
import ChatComponent from "@/components/ChatComponent";
import LanguageSelector from "@/components/LanguageSelector";
import NoteInput from "@/components/NoteComponent";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Lesson {
  id: string;
  title: string;
  content: string;
}

export default function LessonPage({ params }: { params: { id: string } }) {
  const [lessonData, setLessonData] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetch(`http://localhost:3002/lessons/${params.id}`)
      .then((res) => res.json())
      .then((data) => setLessonData(data))
      .catch((error) => console.error("Failed to fetch lesson data", error));

    fetch(`http://localhost:3002/currentLesson`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: params.id }),
    }).catch((error) =>
      console.error("Failed to update current lesson", error)
    );

    fetch(`http://localhost:3002/completed`)
      .then((res) => res.json())
      .then((completedData) => {
        const isCompleted = completedData.some(
          (item: Lesson) => item.id === params.id
        );
        setCompletedLessons({ [params.id]: isCompleted });
      })
      .catch((error) =>
        console.error("Failed to fetch completed lessons", error)
      );
  }, [params.id]);

  const handleCheckboxChange = async (checked: boolean) => {
    const lessonId = params.id;

    setCompletedLessons((prev) => ({
      ...prev,
      [lessonId]: checked,
    }));

    try {
      if (checked) {
        // POST request to add to completed
        await fetch(`http://localhost:3002/completed`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: lessonId }),
        });

        // Show a success toast when marked as completed
        toast.success("Lesson marked as completed!");
      } else {
        // DELETE request to remove from completed
        await fetch(`http://localhost:3002/completed/${lessonId}`, {
          method: "DELETE",
        });

        // Show a success toast when unmarked as completed
        toast.success("Lesson unmarked as completed!");
      }
    } catch (error) {
      console.error("Error:", error);
      // Show an error toast if there's an error with the request
      toast.error("An error occurred. Please try again later.");
    }
  };

  if (!lessonData) {
    return <div>Loading...</div>; // Or any other loading state
  }

  return (
    <div className="flex flex-col pt-10">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
      />
      <div className="flex items-start">
        <div className="flex flex-col">
          <h1 className="mb-2 text-xl font-semibold tracking-tight">
            {lessonData.title}
          </h1>
          <p className="mb-4 text-lg tracking-tight">{lessonData.content}</p>
        </div>
        <div className="flex items-center ml-auto gap-4 space-x-2">
          <LanguageSelector />

          <div className="flex items-center gap-2">
            <Switch
              onCheckedChange={handleCheckboxChange}
              checked={completedLessons[params.id] || false}
            />
            <Label>Mark as Completed</Label>
          </div>
        </div>
      </div>
      <div className="grid w-full gap-4 pt-2">
        <ChatComponent lessonId={lessonData.id} />
        <NoteInput />
      </div>
    </div>
  );
}
