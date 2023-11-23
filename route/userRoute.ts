import express from "express";
import { login, signup } from "../controller/authController";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controller/userController";
import { authGuard } from "../middleware/authGuard";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/").get(authGuard, getAllUsers).post(authGuard, createUser);
router
  .route("/:id")
  .get(authGuard, getUser)
  .put(authGuard, updateUser)
  .delete(authGuard, deleteUser);

export default router;
