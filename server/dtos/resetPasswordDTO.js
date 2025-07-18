const Joi = require('joi');

const resetPasswordDTO = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required()
});

module.exports = resetPasswordDTO;
