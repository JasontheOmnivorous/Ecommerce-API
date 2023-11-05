import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "../controller/productController";
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").put(updateProduct);

export default router;
