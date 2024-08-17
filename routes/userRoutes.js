import express from "express";
import {
  editUserClr,
  listUsers,
  registerUser,
  signIn,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signIn);
router.get("/", protect, listUsers);
router.put("/:id", protect, editUserClr);

export default router;
