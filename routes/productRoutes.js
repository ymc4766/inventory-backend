import express from "express";

import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create", protect, isAdmin, createProduct);
router.route("/").get(protect, getProducts);
router.route("/:id").get(protect, getProduct).put(protect, updateProduct);

export default router;
