import express, { Request, Response } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import LoginService from '../services/login';
import { loginUserSchema, LoginUserSchema,
} from './login';

import { ValidatedRequest } from 'express-joi-validation';

const loginService = new LoginService();

export const loginRouter = express.Router();

const loginController = {
  login: {
    route: '/login',
    service: loginService.login
  },
};

loginRouter.get(loginController.login.route, loginUserSchema, async (req: ValidatedRequest<LoginUserSchema>, res: Response) => {
  const { data, error } = await loginController.login.service(req.query);
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
  res.status(StatusCodes.OK).json(data);
});
