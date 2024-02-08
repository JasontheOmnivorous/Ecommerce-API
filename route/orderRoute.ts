import express from "express";
import { authGuard, restrict } from "../controller/authController";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
} from "../controller/orderController";
const router = express.Router();

router
  .route("/")
  .get(authGuard, restrict("admin"), getAllOrders)
  .post(authGuard, createOrder);

router.delete("/:id", authGuard, cancelOrder);

export default router;
