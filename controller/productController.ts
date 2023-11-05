import { NextFunction, Request, Response } from "express";
import Product from "../model/productModel";
import { RouteHandler } from "../types/types";
import AppError from "../utils/appError";
import catchAsync from "../utils/asyncHandler";

export const getAllProducts: RouteHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      totalProducts: products.length,
      data: products,
    });
  }
);

export const getProduct: RouteHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (!product)
      return next(new AppError("No products found with that ID.", 404));

    res.status(200).json({
      status: "success",
      data: product,
    });
  }
);

export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  }
);

export const updateProduct: RouteHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: updatedProduct,
    });
  }
);

export const deleteProduct: RouteHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
