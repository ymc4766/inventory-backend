import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "add the product name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "add the category"],
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    modalNo: {
      type: String,
    },

    location: {
      type: String,
      trim: true,
    },
    supplier: {
      type: String,
      trim: true,
      default: "N/A",
    },
    price: {
      type: Number,
      default: 0.0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    uom: {
      type: String,
      default: "PCS",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
