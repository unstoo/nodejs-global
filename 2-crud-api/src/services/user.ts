import { Op } from "sequelize";
import { NewUserDTO, UserDTO } from "../controllers/user";
import { Models, sequelize } from "../data-access/models";
import { JWTService } from './jwt';

const { User, Group } = Models;
const jwtService = new JWTService();


const result = (error: null | any, data: any) => ({ error, data });
export default class UserService {
  async get(args: { id: string; }) {
    try {
      const user = await User.findOne({
        where: {
          user_id: args.id,
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
      const newUser = await User.create(user);
      return result(null, newUser);
    } catch (err) {
      return result(err, null);
    }
  }
  async delete(args: { id: string; }) {
    try {
      const updated = await User.update({ is_deleted: true }, {
        where: {
          is_deleted: false,
          user_id: args.id
        }
      });
      return result(null, updated);
    } catch (err) {
      return result(err, null);
    }
  }
  async patch(user: Omit<UserDTO, 'is_deleted'> ) {
    try {
      const updated = await User.update(
        {
          login: user.login,
          password: user.password,
          age: user.age,
        },
        {
          where: {
            user_id: user.id,
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
      const users = await User.findAll({
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
  async addToGroup(args: { groupId: string; userIds: string[]; }) {
    try {
      await sequelize.transaction(async (t) => {        
        const group = await Group.findByPk(args.groupId, { transaction: t });
        const users = await User.findAll({
          where: 
          {
            user_id: {
              [Op.in]: args.userIds,
            },
            is_deleted: false,
          }
        });
        //@ts-ignore
        await group.addUser(users, { transaction: t });  
      });
      return result(null, args);
    } catch (err) {
      return result(err, null);
    }
  }
  async login(args: { login: string; password: string; }) {
    try {
      const user = await User.findOne({
        where: {
          login: args.login,
          is_deleted: false,
        },
      });
      const token = jwtService.get({login: args.login});
      return result(null, token);
    } catch (err) {
      return result(err, null);
    }
  }
}