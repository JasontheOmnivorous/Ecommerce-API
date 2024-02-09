import express from "express";
import { authGuard } from "../controller/authController";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
} from "../controller/orderController";
const router = express.Router();

router.route("/").get(authGuard, getAllOrders).post(authGuard, createOrder);

router.delete("/:id", authGuard, cancelOrder);

export default router;
