import express from "express";
import timeSheetValidation from "../validator/time_sheet.validator.js";
import timeSheetController from "../controllers/time_sheet.controller.js";
const timeSheetRouter = express.Router();

export default timeSheetRouter;

timeSheetRouter.post(
  "/create",
  timeSheetValidation,
  timeSheetController.createTimeSheet
);
