import Joi from "joi";
import errorFunction from "../helper/errorFunction.js";
const validationUser = Joi.object({
  email: Joi.string().email().trim(true).required(),
  password: Joi.string().min(8).trim(true).required(),
  fullName: Joi.string().trim(true).required(),
  avatar: Joi.string().trim(true),
  role: Joi.array().items(Joi.string().alphanum().trim(true)).default([1]),
  status: Joi.number().integer().default(1),
});

const userValidation = async (req, res, next) => {
  const payload = {
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
  };

  const { error } = validationUser.validate(payload);
  if (error) {
    return res
      .status(406)
      .json(errorFunction(true, `Error in User Data: ${error?.message}`));
  }
  next();
};

export default userValidation;
