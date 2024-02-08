import { NextFunction, Request, Response } from "express";
import { Order } from "../model/orderModel";
import catchAsync from "../utils/asyncHandler";

export const getAllOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find();

    res.status(200).json({
      status: "success",
      orders,
    });
  }
);

export const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.create(req.body);

    res.status(201).json({
      status: "success",
      order,
    });
  }
);
