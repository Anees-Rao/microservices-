import Joi from 'joi';

export const VerifyJWTSchema = Joi.object({
    token: Joi.string().required().min(100).max(5000),
});
