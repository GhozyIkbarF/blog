import express from "express";
import { register, login, logout, refreshToken, forgotPassword } from "../controllers/uath.controller.js";
import { registerMiddleware } from "../middleware/register_middleware.js";
const auth_router = express.Router();

auth_router.post("/login", login);
auth_router.delete("/logout", logout);
auth_router.post("/register", registerMiddleware, register);
auth_router.post("/forgot-password", forgotPassword);
auth_router.get("/token", refreshToken);

export default auth_router;