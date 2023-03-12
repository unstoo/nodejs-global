import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../services/jwt';

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