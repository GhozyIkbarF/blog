import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/uath.controller.js";
import { registerMiddleware } from "../middleware/register_middleware.js";
import { changePasswordValidation } from "../validations/user_validation.js";
import {
  register,
  getUser,
  updateUser,
  updatePassword,
  login,
  logout,
} from "../controllers/user.controller.js";

const user_router = express.Router();

user_router.post("/login", login);
user_router.delete("/logout", logout);
user_router.post("/register", registerMiddleware, register);
// user_router.post('/register', register);
user_router.get("/token", refreshToken);
// user_router.get('/user/:id', verifyToken, getUser)
user_router.get("/user/:id", getUser);
user_router.patch("/user/edit/:id", updateUser);
user_router.patch(
  "/user/edit/password/:id",
  changePasswordValidation,
  updatePassword
);
// user_router.patch('/user/edit/:id', verifyToken, updateUser);

export default user_router;
