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
        image: { type: String },
        price: { type: Number },
        product: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      comment: { type: String },
      reqBy: { type: String },
      approved: { type: String },
    },
    supplier: {
      type: String,
    },
    approvedStatus: {
      approvedBy: { type: String },
      remarks: { type: String },
    },
    approvedStatusProcur: {
      paymentMethod: {
        type: String,
        default: "Cash",
        //   required: true,
      },
      invoiceNumber: {
        type: String,
      },
    },

    requisitionSteps: {
      type: String,
      required: [true, "please choose type of requisition"],
      enum: {
        values: ["FACTORY REQUISITION", "PURCHASE REQUISITION"],
      },
    },

    totalPrice: {
      type: Number,
      // required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      // required: true,
      default: false,
    },
    isApprovedBy: {
      type: Boolean,
      // required: true,
      default: false,
    },
    isApprovedByAt: {
      type: Date,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    isRecieved: {
      type: Boolean,
      required: true,
      default: false,
    },
    recievedAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },

    orderStatus: {
      type: String,
      enum: {
        values: ["Processing", "Shipped", "Delivered"],
        message: "Please select correct order status",
      },
      default: "Processing",
    },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
