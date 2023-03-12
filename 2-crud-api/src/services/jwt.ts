
import { NextFunction, Request, Response } from 'express';
import { verify, sign, JwtPayload } from 'jsonwebtoken';

const secret = String(process.env.JWT_SECRET);

const hasExpired = (stamp: number) => {
  const now = Date.now();
  return now > stamp * 1000;
};

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error();
    const [label, maybeToken] = authorization.split(' ');
    if (label !== 'Bearer') throw new Error();
    const verified = verify(maybeToken, secret) as JwtPayload;
    if (hasExpired(verified.exp ?? 0)) throw new Error();
  } catch (e) {
    throw new Error('Wrong access token');
  }
  return next();
};

const makeTokens = (login: string, secret: string) => {
  const accessToken = sign({ login }, secret, {
    expiresIn: '24h',
  });

  const refreshToken = sign({ login }, secret, {
    expiresIn: '14d',
  });

  return result(null, {
    accessToken,
    refreshToken,
  })
};

const result = (error: null | any, data: any) => ({ error, data });

export class JWTService {
  async get(args: { login: string; }) {
    return makeTokens(args.login, secret);
  }
  async refresh(args: { refreshToken: string; }) {
    try {
      const verified = verify(args.refreshToken, secret) as JwtPayload;
      if (hasExpired(verified.exp ?? 0)) {
        return result(403, null);
      }

      return result(null, makeTokens(verified.login, secret));
    } catch (e) {
      return result(403, null);
    }
  }
}