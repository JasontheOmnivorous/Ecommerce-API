import { NextFunction, Request, Response } from "express";
import { RouteHandler } from "../types/app";

// handle errors from async functions
const catchAsync = (fn: RouteHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

export default catchAsync;
