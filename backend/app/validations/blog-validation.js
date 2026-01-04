const Joi = require("joi");

const blogValidation = Joi.object({
    title: Joi.string().min(10).max(70).required().trim(),
    content: Joi.string().min(300).max(10000).required().trim(),
});

module.exports = blogValidation;
