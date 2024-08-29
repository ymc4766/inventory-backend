import Product from "../models/productModal.js";
import { asyncHandler } from "../utils/asynchandler.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(403).json({ message: "Name is required" });
  }

  const product = await Product.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(product);
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.status(201).json({ count: products.length, products });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(401).json({ message: "product Not Foound !" });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    res.status(403);
    throw new Error("Product Not Found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json(updateProduct);
});
