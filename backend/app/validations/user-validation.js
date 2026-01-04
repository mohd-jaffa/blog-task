const Joi = require("joi");

const registerValidation = Joi.object({
    name: Joi.string().trim().required().min(5).max(30),
    email: Joi.string().email().required().trim(),
    password: Joi.string().trim().required().min(8).max(128),
});

const loginValidation = Joi.object({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().min(8).max(128),
});

module.exports = {
    registerValidation,
    loginValidation,
};
