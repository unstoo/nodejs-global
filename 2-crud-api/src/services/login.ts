import { Models } from "../data-access/models";
import { JWTService } from './jwt';

const { User } = Models;
const jwtService = new JWTService();

const result = (error: null | any, data: any) => ({ error, data });

export default class LoginService {
  async login(args: { login: string; password: string; }) {
    try {
      const user = await User.findOne({
        where: {
          login: args.login,
          is_deleted: false,
        },
      });
      const { data } = await jwtService.get({login: args.login});
      return result(null, data);
    } catch (err) {
      return result(err, null);
    }
  }
}