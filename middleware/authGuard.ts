import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RouteHandler } from "../types/types";
import AppError from "../utils/appError";
import catchAsync from "../utils/asyncHandler";
import { ExtendedRequest } from "../utils/extendedRequest";
import User from "./../model/userModel";
dotenv.config({ path: "./../config.env" });

export const authGuard: RouteHandler = catchAsync(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let token: string = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; // extract token from 'Bearer token'
    }

    if (!token) return next(new AppError("You're not logged in.", 401));

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_STR as string
      ) as JwtPayload;
    
      const freshUser = await User.findById(decoded.id);

      if (!freshUser) return next(new AppError("The user belonging to this token is no longer exists.", 401);
      
      next();
  }
);
