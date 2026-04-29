import { Router } from "express";
import { login } from "../controllers/authControllers.js";

const authRoutes = Router();
authRoutes.post("/login", login);

export default authRoutes;
