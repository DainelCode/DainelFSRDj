import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Form.css";
import "../styles/Home.css";
import Note from "../components/Note";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState([]);
  useEffect(() => getNotes(), []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => {
        console.log(res.username);
        return res.data;
      })
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created");
        else alert("Failed to create note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <form onSubmit={createNote}>
        <h2>Create a note</h2>

        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="form-input"
        />
        <br />

        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          type="content"
          id="content"
          name="content"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="form-input"
        ></textarea>

        <input type="submit" value="Submit" className="form-button" />
      </form>
      <div className="notes-section">
        <h2>Notes</h2>
        {notes.map((note) => {
          return (
            <Note
              note={note}
              onDelete={deleteNote}
              styleClass={note.id % 2 > 0 ? "note-container" : "note"}
              key={note.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
