import * as Joi from 'joi'
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator,
} from 'express-joi-validation'

const validator = createValidator();

export const loginUserSchema = validator.query(
  Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required().alphanum().pattern(new RegExp('[a-zA-Z]')).pattern(new RegExp('[0-9]')),
  })
);

export interface LoginUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    login: string;
    password: string;
  }
}
