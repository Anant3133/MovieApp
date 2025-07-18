const Joi = require('joi');

const updateSettingsDTO = Joi.object({
  name: Joi.string().min(3).optional(),
  password: Joi.string().min(6).optional()
}).or('name', 'password'); // at least one is required

module.exports = updateSettingsDTO;
