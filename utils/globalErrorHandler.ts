import { NextFunction, Request, Response } from "express";
import AppError from "./appError";

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode;
  const status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  const message = err.message;

  res.status(statusCode).json({
    status,
    message,
  });
};

export default globalErrorHandler;
