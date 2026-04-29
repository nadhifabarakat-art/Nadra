import { User } from "../Models/Login.js";
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    service: String,
  },
  { timestamps: true },
);
export default mongoose.model("Contact", contactSchema);
