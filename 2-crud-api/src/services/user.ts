import { Op } from "sequelize";
import { NewUserDTO, UserDTO } from "../controllers/user";
import { User, Group } from "../models/user";
// import { UserGroupModel } from "../models/user_group";


const result = (error: any, data: any) => ({ error, data });
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
      // console.log('added', args);
      const groups = await Group.findAll();
      const users = await User.findAll();
      // @ts-ignore
      console.log(groups[0].group_id)
      // @ts-ignore
      console.log(users[0].user_id)
      // @ts-ignore
      const res = await users[0].addGroup(groups[0])
      console.log(res)
      // const users = await User.findAll({
      //   where: 
      //   {
      //     id: {
      //       [Op.in]: args.userIds,
      //     }
      //   }
      // });

      

      return result(null, args);
    } catch (err) {
      return result(err, null);
    }
  }
}