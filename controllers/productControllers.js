import Product from "../models/productModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const product = await Product.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json(product);
});
