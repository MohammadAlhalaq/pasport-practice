const Joi = require('@hapi/joi');
exports.loginSc = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).message('Email not valid').required(),
  password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/).message('pass must be number from 3 to 30 length').required(),
        button: Joi.string(),

});
exports.signupSc = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).message('Email not valid').required(),
  name: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).message('Name must be between 3 and 30').required(),

  password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/).message('pass must be number from 3 to 30 length').required(),
  confirmPass: Joi.ref('password'),
  button: Joi.string(),
});
