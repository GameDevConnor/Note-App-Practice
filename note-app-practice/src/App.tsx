import "./App.css";
import React, { useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>(
    // Initial value
    [
      {
        id: 1,
        title: "note title 1",
        content: `
        When I look into your eyes
It's like watching the night sky
Or a beautiful sunrise
Well, there's so much they hold
And just like them old stars
I see that you've come so far
To be right where you are
How old is your soul?
        `,
      },
      {
        id: 2,
        title: "note title 2",
        content: `
        Well, I won't give up on us
Even if the skies get rough
I'm giving you all my love
I'm still looking up
        `,
      },
      {
        id: 3,
        title: "note title 3",
        content: `
        And when you're needing your space
To do some navigating
I'll be here patiently waiting
To see what you find
        `,
      },
      {
        id: 4,
        title: "note title 4",
        content: `
        'Cause even the stars, they burn
Some even fall to the earth
We got a lot to learn
God knows we're worth it
No, I won't give up
        `,
      },
    ],
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();

    // Error handling
    // If it runs without a selected note it will throw an error
    if (!selectedNote) {
      return;
    }

    const updateNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNoteList = notes.map((note) =>
      note.id === selectedNote.id ? updateNote : note,
    );

    setNotes(updatedNoteList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    const updatedNotes = notes.filter((note) => noteId !== note.id);

    setNotes(updatedNotes);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  return (
    <div className="app-container">
      {/* This is for creating the note */}
      <form
        className="note-form"
        onSubmit={(event) =>
          selectedNote ? handleUpdateNote(event) : handleAddNote(event)
        }
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        ></input>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        ></textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      {/* This is the grid for storing the notes. A CSS grid*/}
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" onClick={() => handleNoteClick(note)}>
            {/* The header of the note which will have the X button */}
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}>X</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
