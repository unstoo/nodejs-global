import express, { Request, Response } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import LoginService from '../services/login';
import { loginUserSchema, LoginUserSchema,
} from './login';

import { ValidatedRequest } from 'express-joi-validation';
import UserService from '../services/user';
import { AddUserSchema, addUserSchema } from './user';

const loginService = new LoginService();
const userService = new UserService();

export const loginRouter = express.Router();

const loginController = {
  login: {
    route: '/login',
    service: loginService.login
  },
  register: {
    route: '/register',
    service: userService.add
  },
};


loginRouter.get(loginController.login.route, loginUserSchema, async (req: ValidatedRequest<LoginUserSchema>, res: Response) => {
  const { data, error } = await loginController.login.service(req.query);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});

loginRouter.post(loginController.register.route, addUserSchema, async (req: ValidatedRequest<AddUserSchema>, res: Response
) => {
  const { data, error } = await loginController.register.service(req.body);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});
