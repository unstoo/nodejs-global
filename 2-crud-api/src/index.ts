import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import {
  StatusCodes,
} from 'http-status-codes';

import {
  getUserSchema, GetUserSchema,
  addUserSchema, AddUserSchema,
  patchUserSchema, PatchUserSchema,
  autoSuggestSchema, AutoSuggestSchema,
} from './controllers/user';
import UserService from './services/user';
import { pgInit } from './loaders/pgInit';


async function start() {
  await pgInit();

  const app: Express = express();
  const port = process.env.PORT;
  app.use(express.json());

  const userService = new UserService();

  const Router = {
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

  app.get(Router.getUser.route, getUserSchema, async (req: ValidatedRequest<GetUserSchema>, res: Response) => {
    const { data, error } = await Router.getUser.service(req.query);
    if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    res.status(StatusCodes.OK).json(data);
  });

  app.post(Router.addUser.route, addUserSchema, async (req: ValidatedRequest<AddUserSchema>, res: Response
  ) => {
    const { data, error } = await Router.addUser.service(req.body);
    if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    res.status(StatusCodes.OK).json(data);
  });

  app.patch(Router.patchUser.route, patchUserSchema, async (req: ValidatedRequest<PatchUserSchema>, res: Response) => {
    const { data, error } = await Router.patchUser.service(req.body);
    if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    res.status(StatusCodes.OK).json(data);
  });

  app.delete(Router.deleteUser.route, async (req: Request, res: Response) => {
    const { data, error } = await Router.deleteUser.service(req.body);
    if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    res.status(StatusCodes.OK).json(data);
  });

  app.get(Router.getUsersList.route, autoSuggestSchema, async (req: ValidatedRequest<AutoSuggestSchema>, res: Response) => {
    const { data, error } = await Router.getUsersList.service(req.query);
    if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    res.status(StatusCodes.OK).json(data);
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

start();
