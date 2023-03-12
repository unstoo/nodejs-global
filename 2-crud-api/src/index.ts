import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response, NextFunction } from 'express';

// import { pgInit } from './loaders/pgInit';
import { userRouter } from './controllers/userRouter';
import { groupRouter } from './controllers/groupRouter';
import { JWTService } from './services/jwt';
import { logger } from './logger';
import { loginRouter } from './controllers/loginRouter';

const jwtService = new JWTService();

export const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization ?? '';
    const [label, maybeToken] = authorization.split(' ');
    if (label !== 'Bearer') {
      res.status(401).send('Unauthorized');
      throw new Error();
    }


    const verified = jwtService.verify(maybeToken);

    if (verified === null) {
      res.status(403).send('Forbidden');
      throw new Error();
    }

    next();
  } catch (e) {
  }
};

async function start() {
  // await pgInit();

  const app: Express = express();
  const port = process.env.PORT;
  app.use(express.json());
  app.use((req: Request, res: Response, next: NextFunction) => {
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
  app.use('/', loginRouter);

  app.use(checkAuthorization);
  app.use('/user/', userRouter);
  app.use('/group/', groupRouter);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }
    if (err) {
      res.status(500);
      res.send('Internal Server Error');
    }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

start();


process.on('uncaughtException', (error, origin) => {
  console.log(error);
  console.log(origin);
  logger.error({ error, origin });
  process.exit(1);
});

process.on('unhandledRejection', (error, origin) => {
  logger.error({ error, origin });
});