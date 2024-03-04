import express from "express";
import multerUtil from "../helper/multer.js";
import authController from "../controllers/user.controller.js";
import userValidation from "../validator/user.validator.js";
const authRouter = express.Router();

authRouter.post(
  "/signup",
  multerUtil.upload.single("file"),
  userValidation,
  authController.signup
);

authRouter.post("/login", authController.login);

authRouter.get("/signup-confirm", authController.signupConfirm);

export default authRouter;
