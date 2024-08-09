import express from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(protect, createProduct);
router.route("/").get(protect, getProducts);
router.route("/:id").get(protect, getProduct).put(protect, updateProduct);

export default router;
