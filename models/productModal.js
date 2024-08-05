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
      required: [true, "Please add a name"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    modelNO: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },
    uom: {
      type: String,
      trim: true,
      required: true,
      default: "PCS",
    },
    qty: {
      type: Number,
      // required: [true, "Please add a quantity"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
    supplier: {
      type: String,
      trim: true,
      default: "N/A",
    },
    stock: {
      type: Number,
      default: 0,
    },

    reviews: [],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
