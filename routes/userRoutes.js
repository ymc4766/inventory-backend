import express from "express";
import { authUser, register } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", authUser);

export default router;
