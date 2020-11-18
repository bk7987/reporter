import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function validateBody<T>(targetClass: ClassType<T>) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const instance = plainToClass(targetClass, req.body);
    const errors = await validate(instance);
    console.log(errors);
    next();
  };
}
