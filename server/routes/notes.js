import express from "express";
import { getNotes, createNote, deleteNote, updateNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

export default router;
