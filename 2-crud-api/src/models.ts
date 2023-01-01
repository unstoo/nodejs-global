import * as Joi from 'joi'
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator,
} from 'express-joi-validation'

export type UserDTO = {
  id: string;
  login: string;
  password: string;
  age: string;
  isDeleted: boolean;
}

export type NewUserDTO = {
  login: string;
  password: string;
  age: string;
}

const validator = createValidator();

export const addUserSchema = validator.body(
  Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required().alphanum().pattern(new RegExp('[a-zA-Z]')).pattern(new RegExp('[0-9]')),
    age: Joi.number().required().min(4).max(130),
  })
);

export const patchUserSchema = validator.body(
  Joi.object({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required().alphanum().pattern(new RegExp('[a-zA-Z]')).pattern(new RegExp('[0-9]')),
    age: Joi.number().required().min(4).max(130),
  })
);

export interface AddUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    login: string;
    password: string;
    age: number;
  }
}

export interface PatchUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    id: string;
    login: string;
    password: string;
    age: number;
  }
}