import { NextFunction, Request, Response } from "express";
import { Order } from "../model/orderModel";
import { ExtendedRequest } from "../types/app";
import AppError from "../utils/appError";
import catchAsync from "../utils/asyncHandler";
import { emailSender } from "../utils/emailSender";

export const getAllOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({ isArchived: false });

    res.status(200).json({
      status: "success",
      totalOrders: orders.length,
      orders,
    });
  }
);

export const createOrder = catchAsync(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const order = await Order.create({ ...req.body, user: req.user });

    res.status(201).json({
      status: "success",
      order,
    });
  }
);

export const cancelOrder = catchAsync(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const deletedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        isArchived: true,
      },
      {
        new: true,
        runValidators: false,
      }
    );

    if (!deletedOrder)
      return next(
        new AppError("Something went wrong with cancelling this order.", 500)
      );

    const subject = "Order Cancellation";
    const message = "Your order was cancelled successfully.";
    await emailSender({ email: req.user?.email as string, subject, message });

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
