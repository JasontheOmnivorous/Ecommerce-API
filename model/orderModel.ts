import mongoose from "mongoose";
import { ProductType } from "./productModel";
import { UserType } from "./userModel";

interface OrderType {
  totalPrice: number;
  products: ProductType[];
  user: UserType;
}

const orderSchema = new mongoose.Schema<OrderType>({
  totalPrice: {
    type: Number,
    required: [true, "Total price is required."],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

orderSchema.pre(/^find/, function (this, next) {
  this.populate({
    path: "products",
    select: "name price",
  }).populate({
    path: "user",
    select: "name email",
  });

  next();
});

export const Order = mongoose.model("Order", orderSchema);
