import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel";
import { RouteHandler } from "../types/types";
import AppError from "../utils/appError";
import catchAsync from "../utils/asyncHandler";
dotenv.config({ path: `${__dirname}/../config.env` });

const signToken = (id: number) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_STR || "", {
    expiresIn: process.env.TOKEN_EXP || "",
  });
};

export const signup: RouteHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // save only necessary informations inputted to the DB due to  security reasons
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // create a token and send it back to client side
    const token = signToken(newUser._id);
    console.log(token);

    res.status(201).json({
      status: "success",
      token,
    });
  }
);

export const login: RouteHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // if no email or password are found within req.body, send error and return this function
    if (!email || !password)
      return next(new AppError("Please provide email and password.", 404));

    // find user that matches with provided email and include the password of the user, if found
    const user = await User.findOne({ email: email }).select("+password");

    // if the user wasn't found, return and send error
    if (!user || user.correctPassword(password, user.password) === false)
      return next(new AppError("Incorrect email or password.", 404));

    // create and send a token back if all these conditions are passed
    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  }
);
