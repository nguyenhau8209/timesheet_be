import Joi from "joi";
import errorFunction from "../helper/errorFunction";

const validation = Joi.object({
  locationName: Joi.string().trim(true).required(),
});

const locationValidation = async (req, res, next) => {
  const payload = {
    locationName: req.body.locationName,
  };

  const { error } = validation.validate(payload);

  if (error) {
    return res
      .status(406)
      .json(errorFunction(`Error in Data Location ${error?.message}`));
  }
  next();
};

export default locationValidation;
