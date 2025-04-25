const express = require("express");
const router = express.Router();
const NoteController = require("../controllers/Note.controller");
const { authUser } = require("../middleware/auth");

router.post("/createNote", authUser, NoteController.createNote);
router.get("/getAllNotes", authUser, NoteController.getAllNotes);
router.get("/getNote/:id", authUser, NoteController.getNote);
router.put("/updateNote/:id", authUser, NoteController.updateNote);
router.delete("/deleteNote/:id", authUser, NoteController.deleteNote);

module.exports = router;
