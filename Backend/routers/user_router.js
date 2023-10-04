import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { changePasswordValidation } from "../validations/user_validation.js";
import {
  getUser,
  updateUser,
  updatePhotoProfile,
  updatePassword,
} from "../controllers/user.controller.js";
import { upload } from "../helpers/uploadImage.js";

const user_router = express.Router();

// user_router.get('/user/:id', verifyToken, getUser)
user_router.get("/user/:id", getUser);
user_router.patch("/user/edit/:id", updateUser);
user_router.patch("/user/edit/photoProfile/:id", upload.single("file"), updatePhotoProfile);
user_router.patch(
  "/user/edit/password/:id",
  changePasswordValidation,
  updatePassword
);

export default user_router;
