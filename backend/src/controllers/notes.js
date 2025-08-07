import Note from "../models/note.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error come from the getNotes", error);
    res.status(500).json({ messege: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json(note);
  } catch (error) {
    console.error("Error come from the getIdByNote", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("Error come from the createNotes", error);
    res.status(500).json({ messege: "Internal server error" });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });

    if (!updatedNote) {
      return res.status(400).json({ messege: "Note not found" });
    }

    res.status(200).json({ updatedNote });
  } catch (error) {
    console.error("Error come from the updateNotes", error);
    res.status(500).json({ messege: "Internal server error" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);

    if (!deleteNote) {
      return res.status(400).json({ messege: "Note not found" });
    }

    res.status(200).json({ messege: "Note deleted successfully" });
  } catch (error) {
    console.error("Error come from deleteNote", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
