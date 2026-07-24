const Joi = require("joi");

const registerShema = Joi.object({
  firstName: Joi.string().required().min(3).max(50),
  middleName: Joi.string().min(1).max(50),
  lastName: Joi.string().required().min(3).max(50),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  gender: Joi.string().required().valid("male", "female"),
  age: Joi.number().required().min(1),
  password: Joi.string().required().min(8).max(128),
});

const loginShema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(8).max(128),
});

module.exports = { registerShema, loginShema };
