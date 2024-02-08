import express from "express";
import { authGuard, login, signup } from "../controller/authController";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controller/userController";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.use(authGuard);
router.route("/").get(authGuard, getAllUsers).post(authGuard, createUser);
router
  .route("/:id")
  .get(authGuard, getUser)
  .put(authGuard, updateUser)
  .delete(authGuard, deleteUser);

export default router;
