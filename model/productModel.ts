import mongoose from "mongoose";

export interface ProductType {
  _id?: mongoose.Types.ObjectId;
  name: string;
  price: number;
  coverImage: string;
  description: string;
}

// Schema is a blueprint to create actual models
const productSchema = new mongoose.Schema<ProductType>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlenght: [
      40,
      "Product name must be shorter than or equal to 40 characters.",
    ],
    minlength: [
      10,
      "Product name must be longer than or equal to 10 characters.",
    ],
  },
  price: {
    type: Number,
    required: [true, "A product must have a price."],
  },
  coverImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [20, "Description must be longer than 20 characters."],
  },
});

// create model named "Product" using schema blueprint
const Product = mongoose.model("Product", productSchema);

export default Product;
