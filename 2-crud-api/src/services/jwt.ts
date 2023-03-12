
import { verify, sign } from 'jsonwebtoken';

const hasExpired = (stamp: number) => {
  const now = Date.now();
  return now > stamp * 1000;
};

const validateRequest = (req) => {
  let verified;
  try {
    const [label, maybeToken] = req.headers.authorization.split(' ');
    if (label !== 'Bearer') throw new Error();
    verified = verify(maybeToken, process.env.JWT_SECRET);
    if (hasExpired(verified.exp)) throw new Error();
  } catch (e) {
    throw new UnauthorizedException('Wrong access token');
  }
  return true;
};

const makeTokens = (login: string) => {
  const accessToken = sign({ login }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  const refreshToken = sign({ login }, process.env.JWT_SECRET, {
    expiresIn: '14d',
  });

  return result(null, {
    accessToken,
    refreshToken,
  })
};

const result = (error: null | any, data: any) => ({ error, data });

export default class JWTService {
  async get(args: { login: string; }) {
    return makeTokens(args.login);
  }
  async refresh(args: { refreshToken: string; }) {
    let verified;
    try {
      verified = verify(args.refreshToken, process.env.JWT_SECRET);
      const now = Date.now();
      const expire = Number(verified.exp) * 1000;
      if (now > expire)
        return result(403, null);
      } catch (e) {
        return result(403, null);
      }

    return result(403, makeTokens(verified.login));
  }
}