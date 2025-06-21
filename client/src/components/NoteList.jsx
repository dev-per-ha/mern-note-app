import { useEffect, useState } from "react";
import axios from "axios";
import './NoteList.css';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "", tags: "" });

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes");
    setNotes(res.data);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  const startEditing = (note) => {
    setEditNoteId(note._id);
    setEditForm({
      title: note.title,
      content: note.content,
      tags: note.tags.join(", ")
    });
  };

  const cancelEdit = () => {
    setEditNoteId(null);
    setEditForm({ title: "", content: "", tags: "" });
  };

  const saveEdit = async () => {
    await axios.put(`http://localhost:5000/api/notes/${editNoteId}`, {
      ...editForm,
      tags: editForm.tags.split(",").map(tag => tag.trim())
    });
    setEditNoteId(null);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      {notes.map(note => (
        <div key={note._id} className="note">
          {editNoteId === note._id ? (
            <>
              <input
                value={editForm.title}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
              />
              <textarea
                value={editForm.content}
                onChange={e => setEditForm({ ...editForm, content: e.target.value })}
              />
              <input
                value={editForm.tags}
                onChange={e => setEditForm({ ...editForm, tags: e.target.value })}
              />
              <button onClick={saveEdit} className="submit-btn">Save</button>
              <button onClick={cancelEdit} className="note-delete">Cancel</button>
            </>
          ) : (
            <>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              {note.tags.length > 0 && <p className="tags">Tags: {note.tags.join(", ")}</p>}
              <button onClick={() => startEditing(note)} className="submit-btn">Edit</button>
              <button onClick={() => deleteNote(note._id)} className="note-delete">Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default NoteList;
