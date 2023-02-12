import * as Joi from 'joi'
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator,
} from 'express-joi-validation'

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type GroupDTO = {
  id: string;
  name: string;
  permissions: Array<Permission>;
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
    permissions: Joi.array().required(),
  })
);

export const patchGroupValidator = validator.body(
  Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    permissions: Joi.array().required(),
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
    permissions: Array<Permission>;
  }
}

export interface PatchGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: string;
    name: string;
    permissions: Array<Permission>;
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