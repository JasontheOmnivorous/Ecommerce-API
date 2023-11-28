import { NextFunction, Request, Response } from "express";
import User from "../model/userModel";
import { RouteHandler } from "../types/types";
import catchAsync from "../utils/asyncHandler";

export const getAllUsers: RouteHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      totalUsers: users.length,
      data: users,
    });
  }
);

export const getUser: RouteHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  }
);

export const createUser: RouteHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      data: user,
    });
  }
);

export const updateUser: RouteHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: updateUser,
    });
  }
);

export const deleteUser: RouteHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(205).json({
      status: "success",
      data: null,
    });
  }
);
