import Joi from "joi";
import errorFunction from "../helper/errorFunction.js";
const validation = Joi.object({
  content: Joi.string().trim(true).required(),
});

const contentValidation = async (req, res, next) => {
  const payload = {
    content: req.body.content,
  };

  const { error } = validation.validate(payload);

  if (error) {
    return res
      .status(406)
      .json(errorFunction(true, `Error in Content Data ${error?.message}`));
  }
  next();
};

export default contentValidation;
