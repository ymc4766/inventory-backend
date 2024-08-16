import express from "express";

import {
  createProduct,
  getProduct,
  getProducts,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create", protect, createProduct);
router.route("/").get(protect, getProducts);
router.route("/:id").get(protect, getProduct);

export default router;
