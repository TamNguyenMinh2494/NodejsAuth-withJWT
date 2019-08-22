//Validation
const Joi = require('@hapi/joi');

//register validation
const registerValidation = (data) => {
    const schema = {
        name: Joi.string().alphanum().min(6).max(30).required(),
        email: Joi.string().min(6).required().email({ minDomainSegments: 2 }),
        password: Joi.string().min(6).required(),

    };
    return Joi.validate(data, schema);
};


const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email({ minDomainSegments: 2 }),
        password: Joi.string().min(6).required(),

    };
    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;