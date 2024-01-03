import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import productRouter from "./route/productRoute";
import userRouter from "./route/userRoute";
import AppError from "./utils/appError";
import globalErrorHandler from "./utils/globalErrorHandler";
const app = express();
dotenv.config({ path: "./config.env" });

// middlewares work as pipeline in express, hence, data pass through middleware after middleware
app.use(
  cors({
    origin: process.env.CORS_URL,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

// If routes doesn't match until this point, that means the route doesn't exist in this server
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  // create custom error with AppError class and send it to global error handling middleware using next function
  next(
    new AppError(`Cannot find url: ${req.originalUrl} on this server.`, 404)
  );
});

app.use(globalErrorHandler); // global error handling middleware

export default app;
