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
  age: number;
  isDeleted: boolean;
}

export type NewUserDTO = {
  login: string;
  password: string;
  age: number;
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

export const autoSuggestSchema = validator.query(
  Joi.object({
    loginSubstring: Joi.string().required(),
    limit: Joi.number().integer().required(),
  })
);

export interface AddUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  }
}

export interface PatchUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: string;
    login: string;
    password: string;
    age: number;
  }
}

export interface AutoSuggestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    loginSubstring: string;
    limit: number;
  }
}