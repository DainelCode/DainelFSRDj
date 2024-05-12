import React from "react";
import "../styles/Note.css";

function Note({ note, onDelete, styleClass }) {
  const formattedDate = new Date(note.created_at).toDateString("en-US");
  return (
    <div className={styleClass}>
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
