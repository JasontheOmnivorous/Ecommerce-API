import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../model/userModel";
import { ExtendedRequest } from "../types/app";
import AppError from "../utils/appError";
import catchAsync from "../utils/asyncHandler";
import { filterBody, signToken } from "../utils/helpers";
dotenv.config({ path: `${__dirname}/../config.env` });

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm, role } = filterBody(
      req.body,
      "name",
      "email",
      "password",
      "passwordConfirm",
      "role"
    );

    if (!name || !email || !password || !passwordConfirm)
      return next(new AppError("Please fill out necessary fields.", 400));

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      role,
    });

    if (!newUser) return next(new AppError("Fail to create new user.", 400));

    const token = signToken(String(newUser._id));

    res.status(201).json({
      status: "success",
      token,
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = filterBody(req.body, "email", "password");

    // if no email or password are found within req.body, send error and return this function
    if (!email || !password)
      return next(new AppError("Please provide email and password.", 404));

    // find user that matches with provided email and include the password of the user, if found
    const user = await User.findOne({ email: email }).select("+password");

    // if the user wasn't found, return and send error
    if (!user || user.correctPassword(password, user.password) === false)
      return next(new AppError("Incorrect email or password.", 404));

    // create and send a token back if all these conditions are passed
    const token = signToken(String(user._id));

    res.status(200).json({
      status: "success",
      token,
    });
  }
);

export const authGuard = catchAsync(
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

    if (!freshUser)
      return next(
        new AppError(
          "The user belonging to this token is no longer exists.",
          401
        )
      );

    req.user = freshUser;
    next();
  }
);

export const restrict = (...allowedRoles: string[]) => {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user?.role as string))
      return next(
        new AppError("You do not have permission to perform this action.", 403)
      );

    next();
  };
};
