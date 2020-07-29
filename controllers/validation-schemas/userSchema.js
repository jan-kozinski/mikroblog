const Joi = require("@hapi/joi");

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "string.base": `E-mail should be a type of 'text'`,
    "string.empty": `E-mail cannot be an empty field`,
    "string.email": "Invalid e-mail",
    "any.required": `E-mail is a required field`,
  }),
  name: Joi.string()
    .pattern(/^\w{5,20}$/)
    .required()
    .messages({
      "string.base": `Name should be a type of 'text'`,
      "string.empty": `Name cannot be an empty field`,
      "string.pattern.base": `Name should contain between 5 and 20 alphanumerical characters (either letters, numbers or underscore)`,
      "any.required": `Name is a required field`,
    }),

  password: Joi.string().min(5).max(15).required().messages({
    "string.base": `Password should be a type of 'text'`,
    "string.empty": `Password cannot be an empty field`,
    "string.min": `Password should contain between 5 and 15 characters`,
    "string.max": `Password should contain between 5 and 15 characters`,
    "any.required": `Password is a required field`,
    "any.only": "Passwords should match!",
  }),

  repeat_password: Joi.ref("password"),
});

module.exports = schema;
