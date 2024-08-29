import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  allOrders,
  myOrders,
  newOrder,
  orderDetails,
  removeOrder,
  updateOderItemPrice,
  updateOrder,
  updateOrderProcurement,
  updateOrderReceived,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/create").post(protect, newOrder);
router.get("/", protect, allOrders);

router.route("/mine").get(protect, myOrders);

router.route("/:id").get(protect, orderDetails).delete(protect, removeOrder);
router.route("/:id/receive").put(protect, updateOrderReceived);
router.route("/:id/updatestock").put(protect, updateOrder);
router.route("/:id/deliver/procur").put(protect, updateOrderProcurement);
router.put("/updateItemPrice/:itemId", protect, updateOderItemPrice);
export default router;
