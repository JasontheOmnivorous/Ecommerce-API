import { NextFunction, Request, Response } from "express";
import Product from "../model/productModel";
import AppError from "../utils/appError";

export const getAllProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = Product.find();

  res.status(200).json({
    status: "success",
    data: products,
  });
};

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
  const product = Product.findById(req.params.id);

  if (!product)
    return next(new AppError("No products found with that ID.", 404));

  res.status(200).json({
    status: "success",
    data: product,
  });
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: newProduct,
  });
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
