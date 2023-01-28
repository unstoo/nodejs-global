import express, { Express, Request, Response } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import UserService from '../services/user';
import {
  getUserSchema, GetUserSchema,
  addUserSchema, AddUserSchema,
  patchUserSchema, PatchUserSchema,
  autoSuggestSchema, AutoSuggestSchema,
} from './user';

import { ValidatedRequest } from 'express-joi-validation';

const userService = new UserService();

export const userRouter = express.Router();

const userController = {
  getUser: {
    route: '/',
    service: userService.get
  },
  addUser: {
    route: '/addUser',
    service: userService.add
  },
  patchUser: {
    route: '/patchUser',
    service: userService.patch
  },
  deleteUser: {
    route: '/deleteUser',
    service: userService.delete
  },
  getUsersList: {
    route: '/autoSuggest',
    service: userService.find,
  },
};

userRouter.get(userController.getUser.route, getUserSchema, async (req: ValidatedRequest<GetUserSchema>, res: Response) => {
  const { data, error } = await userController.getUser.service(req.query);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});

userRouter.post(userController.addUser.route, addUserSchema, async (req: ValidatedRequest<AddUserSchema>, res: Response
) => {
  const { data, error } = await userController.addUser.service(req.body);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});

userRouter.patch(userController.patchUser.route, patchUserSchema, async (req: ValidatedRequest<PatchUserSchema>, res: Response) => {
  const { data, error } = await userController.patchUser.service(req.body);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});

userRouter.delete(userController.deleteUser.route, async (req: Request, res: Response) => {
  const { data, error } = await userController.deleteUser.service(req.body);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});

userRouter.get(userController.getUsersList.route, autoSuggestSchema, async (req: ValidatedRequest<AutoSuggestSchema>, res: Response) => {
  const { data, error } = await userController.getUsersList.service(req.query);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});
