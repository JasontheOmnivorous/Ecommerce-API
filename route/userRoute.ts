import express from "express";
import {
  authGuard,
  login,
  restrict,
  signup,
} from "../controller/authController";
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

router
  .route("/")
  .get(authGuard, restrict("admin"), getAllUsers)
  .post(authGuard, restrict("admin"), createUser);
router
  .route("/:id")
  .get(authGuard, restrict("admin"), getUser)
  .put(authGuard, restrict("admin"), updateUser)
  .delete(authGuard, restrict("admin"), deleteUser);

export default router;
