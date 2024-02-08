import express from "express";
import { authGuard, restrict } from "../controller/authController";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controller/productController";
const router = express.Router(); // route mounting

router
  .route("/")
  .get(authGuard, getAllProducts)
  .post(authGuard, restrict("admin"), createProduct);
router
  .route("/:id")
  .get(authGuard, getProduct)
  .put(authGuard, restrict("admin"), updateProduct)
  .delete(authGuard, restrict("admin"), deleteProduct);

export default router;
