import express from "express";
import multerUtil from "../helper/multer.js";
import authController from "../controllers/user.controller.js";
const authRouter = express.Router();

authRouter.post(
  "/signup",
  multerUtil.upload.single("file"),
  authController.signup
);

authRouter.post("/login", authController.login);

authRouter.get("/signup-confirm", authController.signupConfirm);

export default authRouter;
