import Order from "../models/orderModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const newOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    approvedStatus,
    approvedStatusProcur,
    itemsPrice,
    totalPrice,
    paymentMethod,
    invoiceNumber,
    requisitionSteps,
  } = req.body;

  const createdOrder = await Order.create({
    orderItems: orderItems?.map((x) => ({
      product: x._id,
      name: x.name,
      qty: x.qty,
      category: x.category,
      stock: x.stock,
      supplier: x.supplier,
    })),
    user: req.user._id,
    orderItems,
    shippingAddress,
    approvedStatus,
    approvedStatusProcur,
    itemsPrice,
    totalPrice,
    paymentMethod,
    invoiceNumber,
    requisitionSteps,
  });

  res.status(201).json(createdOrder);
});

export const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "id name lvl1 dept local")
    .sort("-createdAt");
  res.json(orders);
});

export const myOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json({ orders });
});

export const orderDetails = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .sort("-createdAt")
    .populate("user", "name email");
  res.status(200).json({ order });
});
