import express from "express";
import { authGuard } from "../controller/authController";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controller/productController";
const router = express.Router(); // route mounting

router.route("/").get(authGuard, getAllProducts).post(authGuard, createProduct);
router
  .route("/:id")
  .get(authGuard, getProduct)
  .put(authGuard, updateProduct)
  .delete(authGuard, deleteProduct);

export default router;
