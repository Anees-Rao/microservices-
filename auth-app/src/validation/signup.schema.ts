import Joi from 'joi';

export const SignupSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(75),
    lastName: Joi.string().optional().min(3).max(75),
    email: Joi.string().email().required().max(150),
    password: Joi.string().required().min(6).max(150),
});
