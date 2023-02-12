import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';

// import { pgInit } from './loaders/pgInit';
import { userRouter } from './controllers/userRouter';
import { groupRouter } from './controllers/groupRouter';
import { logger } from './logger';

async function start() {
  // await pgInit();

  const app: Express = express();
  const port = process.env.PORT;
  app.use(express.json());

  app.use((req, res, next) => {
    const { method, url, query, params, body } = req;
    logger.info({ 
      method,
      url,
      arguments: {
        query, params, body
      }
    });
    next();
  });

  app.use('/user/', userRouter);
  app.use('/group/', groupRouter);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

start();
