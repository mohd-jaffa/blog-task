const Joi = require("joi");

const commentValidation = Joi.object({
    comment: Joi.string().trim().min(1).required(),
});

module.exports = commentValidation;
