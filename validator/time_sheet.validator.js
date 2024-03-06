import Joi from "joi";
import errorFunction from "../helper/errorFunction.js";

const validation = Joi.object({
  userID: Joi.string().trim(true).required(),
  start_date: Joi.number().integer().required(),
  end_date: Joi.number().integer().required(),
  contentID: Joi.string().trim(true).required(),
  description: Joi.string().trim().required().max(1000),
  locationID: Joi.string().trim(true).required(),
  status: Joi.number().integer().default(1),
});

const timeSheetValidation = async (req, res, next) => {
  const payload = {
    userID: req.body.userID,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    contentID: req.body.contentID,
    description: req.body.description,
    locationID: req.body.locationID,
  };

  const { error } = await validation.validate(payload);
  if (error) {
    return res
      .status(406)
      .json(errorFunction(true, `Error data in ${error?.message}`));
  }
  next();
};

export default timeSheetValidation;
