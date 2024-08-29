import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import {
  allUOM,
  createUOM,
  deleteUOM,
  getUOM,
  updateUOM,
} from "../controllers/uomController.js";

const router = express.Router();

router.post("/", protect, createUOM);
router.get("/", protect, allUOM);
router
  .route("/:id")
  .delete(protect, deleteUOM)
  .get(protect, getUOM)
  .put(protect, updateUOM);

export default router;
