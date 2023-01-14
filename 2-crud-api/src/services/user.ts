import { Op } from "sequelize";
import { NewUserDTO, UserDTO } from "../controllers/user";
import { UserModel } from "../models/user";


const result = (error: any, data: any) => ({ error, data });
export default class UserService {
  async get(args: { id: string; }) {
    try {
      const user = await UserModel.findOne({
        where: {
          id: args.id,
          is_deleted: false,
        },
      });
      return result(null, user);
    } catch (err) {
      return result(err, null);
    }
  }
  async add(user: NewUserDTO) {
    try {
      const newUser = await UserModel.create(user);
      return result(null, newUser);
    } catch (err) {
      return result(err, null);
    }
  }
  async delete(args: { id: string; }) {
    try {
      const updated = await UserModel.update({ is_deleted: true }, {
        where: {
          is_deleted: false,
          id: args.id
        }
      });
      return result(null, updated);
    } catch (err) {
      return result(err, null);
    }
  }
  async patch(user: Omit<UserDTO, 'is_deleted'> ) {
    try {
      const updated = await UserModel.update(
        {
          login: user.login,
          password: user.password,
          age: user.age,
        },
        {
          where: {
            id: user.id,
            is_deleted: false,
          },
        });
      return result(null, updated);
    } catch (err) {
      return result(err, null);
    }
  }
  async find(args: { loginSubstring: string; limit: number; }) {
    try {
      const users = await UserModel.findAll({
        where: {
          login: {
            [Op.like]: '%' + args.loginSubstring + '%' 
          },
          is_deleted: false,
        },
        limit: args.limit,
      });
      return result(null, users);
    } catch (err) {
      return result(err, null);
    }
  }
}