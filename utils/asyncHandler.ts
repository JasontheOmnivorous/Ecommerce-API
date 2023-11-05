import { NextFunction, Request, Response } from "express";
import { RouteHandler } from "../types/types";

const catchAsync = (fn: RouteHandler): RouteHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await fn(req, res, next).catch((err: Error) => next(err));
  };
};

export default catchAsync;
