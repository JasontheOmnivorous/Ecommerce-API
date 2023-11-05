import { NextFunction, Request, Response } from "express";

// share type between modules
export type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
