import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { addUserSchema, AddUserSchema, patchUserSchema, PatchUserSchema, autoSuggestSchema, AutoSuggestSchema, getUserSchema, GetUserSchema } from './models';
import { ValidatedRequest } from 'express-joi-validation';
import {
  StatusCodes,
} from 'http-status-codes';

import UserService from './services/user';
import { pgInit } from './loaders/pgInit';

dotenv.config();

async function start() {
  await pgInit();
  const userService = new UserService();
  const Controller = {
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

  const app: Express = express();
  const port = process.env.PORT;

  app.use(express.json());

  app.get(Controller.getUser.route, getUserSchema, async (req: ValidatedRequest<GetUserSchema>, res: Response) => {
    const { data, error } = await Controller.getUser.service(req.query);
    if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    res.status(StatusCodes.OK).json(data);
  });

  app.post(Controller.addUser.route, addUserSchema, async (req: ValidatedRequest<AddUserSchema>, res: Response
  ) => {
    const { data, error } = await Controller.addUser.service(req.body);
    if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    res.status(StatusCodes.OK).json(data);
  });

  app.patch(Controller.patchUser.route, patchUserSchema, async (req: ValidatedRequest<PatchUserSchema>, res: Response) => {
    const { data, error } = await Controller.patchUser.service(req.body);
    if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    res.status(StatusCodes.OK).json(data);
  });

  app.delete(Controller.deleteUser.route, async (req: Request, res: Response) => {
    const { data, error } = await Controller.deleteUser.service(req.body);
    if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    res.status(StatusCodes.OK).json(data);
  });

  app.get(Controller.getUsersList.route, autoSuggestSchema, async (req: ValidatedRequest<AutoSuggestSchema>, res: Response) => {
    const { data, error } = await Controller.getUsersList.service(req.query);
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
