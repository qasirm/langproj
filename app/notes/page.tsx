"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { FileEdit } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoteInput from "@/components/NoteComponent";

interface Note {
  id: string;
  text: string;
}

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editNote, setEditNote] = useState<{ id: string | null; text: string }>(
    { id: null, text: "" }
  );

  useEffect(() => {
    fetch("http://localhost:3002/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data as Note[]))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const handleNewNoteAdded = (newNote: Note) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
    toast.success("Note added successfully");
  };

  const handleUpdateNote = (id: string) => {
    fetch(`http://localhost:3002/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editNote.text }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedNotes = notes.map((note) =>
          note.id === id ? data : note
        );
        setNotes(updatedNotes);
        setEditNote({ id: null, text: "" });
        toast.success("Note updated successfully");
      })
      .catch((error) => {
        console.error("Error updating note:", error);
        toast.error("Error updating note");
      });
  };

  const handleDeleteNote = (id: string) => {
    fetch(`http://localhost:3002/notes/${id}`, { method: "DELETE" })
      .then(() => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        toast.success("Note deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        toast.error("Error deleting note");
      });
  };

  return (
    <div className="grid w-full gap-4">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      {notes.map((note) => (
        <Card key={note.id} className="p-3 mb-2">
          <div className="flex justify-between">
            <div className="flex-grow mr-2">
              {editNote.id === note.id ? (
                <Textarea
                  value={editNote.text}
                  onChange={(e) =>
                    setEditNote({ ...editNote, text: e.target.value })
                  }
                />
              ) : (
                <p>{note.text}</p>
              )}
            </div>
            <div className="flex">
              {editNote.id === note.id ? (
                <Button
                  style={{ backgroundColor: "black" }}
                  onClick={() => handleUpdateNote(note.id)}
                >
                  Save
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setEditNote({ id: note.id, text: note.text })
                    }
                  >
                    <FileEdit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
      <NoteInput />
    </div>
  );
};

export default NotesPage;
