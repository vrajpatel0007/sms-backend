const noteService = require("../services/note.service");

// Create a new note
const createNote = async (req, res) => {
  try {
    const reqbody = req.body;
    if (!reqbody){
      return res.status(400).json({ message: "all required" })
    }
    const noteData = {
      Title: reqbody.title,
      Description: reqbody.description,
      Date: reqbody.date,
      createdBy: req.user._id,
      Society: req.user.societyid
    };
    console.log("🚀 ~ createNote ~ noteData:", noteData)
    const note = await noteService.create(noteData);
    return res.status(201).json(note);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const societyid = req.user.societyid
    const notes = await noteService.getAll(societyid);
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteService.getById(id);
    if (!note) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(note)
  } catch (error) {
    return res.status(404).json({ message: "Note not found" });
  }
}

// Update a note
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteService.getById(id);
    if (!note) {
      return res.status(404).json({ message: "Not found" });
    }

    const updatedData = {};
    if (req.body) {
      updatedData.Title = req.body.Title;
      updatedData.Description = req.body.Description;
      updatedData.Date = req.body.Date;
    }

    const updatedNote = await noteService.update(id, updatedData);
    return res.status(200).json(updatedNote);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteService.getById(id);
    if (!note) {
      return res.status(404).json({ message: "Already deleted" });
    }

    await noteService.remove(id);
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getNote
};
