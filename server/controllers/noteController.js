import Note from "../models/Note.js";

// Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new note
export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const newNote = new Note({ title, content, tags });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Add this function:
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true }
    );
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
