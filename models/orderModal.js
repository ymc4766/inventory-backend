import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    approvedData: {
      reqBy: { type: String },
      approvedBy: { type: String },
      comment: { type: String },
    },
    approvedStatusProcur: {
      paymentMethod: { type: String, default: "Cash" },
    },
    requisitionSteps: {
      type: String,
      required: [true, "please choose the type of Requisition"],
      enum: {
        values: ["FACTORY REQUISITION", "PURCHASE REQUISITION"],
      },
    },
    price: {
      type: Number,
      default: "0",
    },
    supplier: {
      type: String,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    isReceived: {
      type: Boolean,
      required: true,
      default: false,
    },
    receivedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
