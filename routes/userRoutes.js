import express from "express";
import { registerUser, signIn } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signIn);

export default router;
