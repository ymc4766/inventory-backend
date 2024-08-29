import Order from "../models/orderModal.js";
import Product from "../models/productModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const newOrder = asyncHandler(async (req, res) => {
  const { orderItems, approvedData, requisitionSteps, supplier } = req.body;

  const createOrder = await Order.create({
    orderItems: orderItems.map((x) => ({
      product: x._id,
      name: x.name,
      qty: x.qty,
      category: x.category,
      stock: x.stock,
      supplier: x.supplier,
      price: x.price,
    })),
    user: req.user.id,
    orderItems,
    approvedData,
    supplier,
    requisitionSteps,
  });

  res.status(201).json(createOrder);
});

export const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .sort("-createdAt")
    .populate("user", "name email dept");

  res.status(201).json({ orders });
});

export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort("-createdAt");

  res.status(201).json({ orders });
});
export const removeOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(403).json({ messgae: "No Order found with this ID" });
  }

  if (order) {
    await Order.deleteOne({ _id: order._id });
    res.json({ message: "Order removed Succesfuly ..." });
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

export const orderDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  res.status(201).json({ order });
});

export const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return res.status(403).json({ message: "No Order Found in this Order Id" });

  order.orderItems.forEach(async (item) => {
    const product = await Product.findById(item?.product.toString());

    if (!product) return res.status(403).json({ message: "Product Not Found" });

    // Ensure  to Decre the Stock
    product.stock = product.stock - item.qty;

    await product.save({ validateBeforeSave: true });
  });

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

export const updateOrderProcurement = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return res.status(403).json({ message: "No Order Found in this Order Id" });

  order.orderItems.forEach(async (item) => {
    const product = await Product.findById(item?.product.toString());

    if (!product) return res.status(403).json({ message: "Product Not Found" });

    // Ensure  to Decre the Stock
    product.stock = product.stock + item.qty;

    await product.save({ validateBeforeSave: true });
  });

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  order.isReceived = true;
  order.receivedAt = Date.now();
  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

export const updateOrderReceived = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isReceived = true;
    order.receivedAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(403).json({ message: "Order Not Found" });
  }
});

// update price supplier And More Field U want
export const updateOderItemPrice = asyncHandler(async (req, res, next) => {
  const itemId = req.params.itemId;
  const { newPrice, supplier } = req.body;

  try {
    // Find the order that contains the specific order item
    const orderToUpdate = await Order.findOne({ "orderItems._id": itemId });

    if (!orderToUpdate) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the price and supplier of the specific order item
    orderToUpdate.orderItems.forEach(async (item) => {
      if (item._id.toString() === itemId) {
        // Update the order item
        item.price = newPrice;
        item.supplier = supplier || item.supplier;

        // Save the changes to the order
        await orderToUpdate.save();

        // Find the updated order item
        const updatedOrderItem = orderToUpdate.orderItems.find(
          (item) => item._id.toString() === itemId
        );

        // Find the corresponding product and update its price
        const product = await Product.findById(item.product);
        if (product) {
          product.price = newPrice;
          product.supplier = supplier;
          await product.save();
        }

        res.status(200).json({ updatedOrderItem });
      }
    });
  } catch (error) {
    // Use the next middleware to handle errors
    next(new ErrorHandler("Error updating order item price", 500));
  }
});
