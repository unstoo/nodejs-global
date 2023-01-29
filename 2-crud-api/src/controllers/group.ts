import * as Joi from 'joi'
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator,
} from 'express-joi-validation'

type Premission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type GroupDTO = {
  id: string;
  name: string;
  premissions: Array<Premission>;
}

const validator = createValidator();

export const getGroupValidator = validator.query(
  Joi.object({
    id: Joi.string().required(),
  })
);

export const addGroupValidator = validator.body(
  Joi.object({
    name: Joi.string().required(),
    premissions: Joi.array().required(),
  })
);

export const patchGroupValidator = validator.body(
  Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    premissions: Joi.array().required(),
  })
);

export const deleteGroupValidator = validator.body(
  Joi.object({
    id: Joi.string().required(),
  })
);

export const getGroupListValidator = validator.query(
  Joi.object({})
);

export interface GetGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    id: string;
  }
}

export interface AddGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string;
    premissions: Array<Premission>;
  }
}

export interface PatchGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: string; 
    name: string;
    premissions: Array<Premission>;
  }
}

export interface DeleteGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: string;
  }
}

export interface GetGroupListSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: Record<string, never>;
}