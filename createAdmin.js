import { User } from "../Models/Login.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import "dotenv/config";
import connectDB from "./config/db.js";

const createAdmin = async () => {
  await connectDB();

  const hash = await bcrypt.hash("nadra12567", 10);

  await User.create({
    email: "Nadhifabarakat@gmail.com",
    password: hash,
  });

  console.log("Admin created successfully!");
  process.exit();
};

createAdmin();
