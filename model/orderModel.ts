import mongoose, { Types } from "mongoose";
import { ProductType } from "./productModel";
import { UserType } from "./userModel";

interface ProductItem {
  product: Types.ObjectId | ProductType["_id"];
  quantity: number;
}

export interface OrderType {
  totalPrice: number;
  products: ProductItem[];
  user: Types.ObjectId | UserType["_id"];
  isArchived?: boolean;
}

const orderSchema = new mongoose.Schema<OrderType>({
  totalPrice: {
    type: Number,
    required: [true, "Total price is required."],
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

orderSchema.pre(/^find/, function (this, next) {
  this.populate({
    path: "products.product",
    select: "name price",
  }).populate({
    path: "user",
    select: "name email",
  });

  next();
});

export const Order = mongoose.model("Order", orderSchema);
