import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Order, OrderType } from "../model/orderModel";
import { ExtendedRequest } from "../types/app";
import AppError from "../utils/appError";
import catchAsync from "../utils/asyncHandler";

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
    const orderedItems = req.body.orderItems;
    const totalPrice = req.body.totalPrice;

    let order: OrderType = {
      totalPrice,
      products: [],
      user: req.user?._id as Types.ObjectId,
    };

    for (let i = 0; i < orderedItems.length; i++) {
      const productDetails = orderedItems[i];

      const productId = Types.ObjectId(productDetails._id);
      const quantity = productDetails.quantity;

      order.products.push({ product: productId, quantity });
    }

    console.log("order: ", order);
    const newOrder = await Order.create(order);

    res.status(201).json({
      status: "success",
      newOrder,
    });
  }
);

export const cancelOrder = catchAsync(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    // const deletedOrder = await Order.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     isArchived: true,
    //   },
    //   {
    //     new: true,
    //     runValidators: false,
    //   }
    // );

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder)
      return next(
        new AppError("Something went wrong with cancelling this order.", 500)
      );

    // const subject = "Order Cancellation";
    // const message = "Your order was cancelled successfully.";
    // await emailSender({ email: req.user?.email as string, subject, message });

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
