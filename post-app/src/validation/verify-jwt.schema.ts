import Joi from 'joi';

export const CreatePostSchema = Joi.object({
    text: Joi.string().min(1).max(255).required(),
});
