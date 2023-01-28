import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';

import { pgInit } from './loaders/pgInit';
import { userRouter } from './controllers/userRouter';


async function start() {
  await pgInit();

  const app: Express = express();
  const port = process.env.PORT;
  app.use(express.json());
  app.use(userRouter);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

start();
