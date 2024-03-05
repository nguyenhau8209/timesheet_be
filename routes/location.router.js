import express from "express";
import locationValidation from "../validator/location.validator.js";
import locationController from "../controllers/location.controller.js";

const locationRouter = express.Router();

export default locationRouter;

locationRouter.post(
  "/create",
  locationValidation,
  locationController.createLocation
);
locationRouter.get("/", locationController.getAllLocation);
locationRouter.get("/:id", locationController.getLocation);
