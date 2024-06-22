import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export function ValidateBody(schema: Joi.ObjectSchema) {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const req: Request = args[0];
            const res: Response = args[1];
            const next: NextFunction = args[2];

            const { error } = schema.validate(req.body);

            if (error) {
                res.status(400).json({ message: error.details[0].message });
                return;
            }

            originalMethod.apply(this, args);
        };

        return descriptor;
    };
}
