import Joi from 'joi';

export const LoginSchema = Joi.object({
    email: Joi.string().email().required().max(150),
    password: Joi.string().required().min(6).max(150),
});
