// NoteInput.jsx
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

interface Note {
  id: string;
  text: string;
}

const NoteInput = () => {
  const [newNote, setNewNote] = useState("");

  const handlePostNote = () => {
    if (!newNote.trim()) {
      toast.error("Please enter a note.");
      return;
    }

    fetch("http://localhost:3002/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newNote }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewNote(""); // Clear the textarea
        toast.success("Note added successfully");
        // Optionally, you could also update a global state here if needed
      })
      .catch((error) => {
        console.error("Error posting note:", error);
        toast.error("Error adding note");
      });
  };

  return (
    <div className="grid w-full gap-4">
      <Textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Type your note here..."
      />
      <Button style={{ backgroundColor: "black" }} onClick={handlePostNote}>
        Add Note
      </Button>
    </div>
  );
};

export default NoteInput;
