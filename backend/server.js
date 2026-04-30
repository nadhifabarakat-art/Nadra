import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import skincareRoutes from "./routes/skincareRoutes.js";
import offersRoutes from "./routes/offersRoutes.js";
import laserRoutes from "./routes/laserRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { login } from "./controllers/authControllers.js";
import connectDB from "./config/db.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(
  cors({
    origin: "https://nadra-kr80.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/skincare", skincareRoutes);
app.use("/offers", offersRoutes);
app.use("/laser", laserRoutes);
app.use("/contact", contactRoutes);
app.use("/auth", authRoutes);
app.post("/login", login);

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
