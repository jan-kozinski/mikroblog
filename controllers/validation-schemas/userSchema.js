const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().pattern(/^\w{5,20}$/).required(),

  password: Joi.string().pattern(/^\w{5,20}$/).required(),

  repeat_password: Joi.ref("password"),

  email: Joi.string().email({ minDomainSegments: 2 }),
});

module.exports = schema;
