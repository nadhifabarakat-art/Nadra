import express from "express";
import cors from "cors";
import "dotenv/config";
import skincareRoutes from "./routes/skincareRoutes.js";
import offersRoutes from "./routes/offersRoutes.js";
import laserRoutes from "./routes/laserRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/skincare", skincareRoutes);
app.use("/offers", offersRoutes);
app.use("/laser", laserRoutes);
app.use("/contact", contactRoutes);
app.use("/auth", authRoutes); // ✅

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
