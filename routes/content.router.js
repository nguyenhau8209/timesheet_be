import express from "express";
import contentValidation from "../validator/content.validator.js";
import contentController from "../controllers/content.controller.js";
const contentRouter = express.Router();

contentRouter.post(
  "/create",
  contentValidation,
  contentController.createContent
);
contentRouter.get("/", contentController.getAllContent);
contentRouter.get("/:id", contentController.getContent);
contentRouter.delete("/:id", contentController.deleteContent);
contentRouter.put("/:id", contentController.updateContent);
export default contentRouter;
