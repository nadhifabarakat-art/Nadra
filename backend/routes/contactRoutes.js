import express from "express";
import {
  createContact,
  deleteContact,
  getContacts,
} from "../controllers/contactControllers.js";
import validate from "../middleware/validate.js";
import { contactSchema } from "../validators/contactSchema.js";

const router = express.Router();
router.post("/", createContact);
router.get("/", getContacts);
router.delete("/:id", deleteContact);
export default router;
