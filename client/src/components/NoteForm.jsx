import { useState, useEffect } from "react";
import axios from "axios";
import "./NoteForm.css";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newNote = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await axios.post("http://localhost:5000/api/notes", newNote);
      setTitle("");
      setContent("");
      setTags("");
      setToastMessage("✅ Note added successfully!");
    } catch (err) {
      console.error("Failed to save note:", err.message);
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <>
      <form onSubmit={handleSubmit} className="note-form">
        <input
          className="note-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="note-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <input
          className="note-input"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
        />
        <button className="note-submit" type="submit">
          Save Note
        </button>
      </form>

      {/* Inline Toast */}
      {toastMessage && <div className="toast">{toastMessage}</div>}
    </>
  );
};

export default NoteForm;
