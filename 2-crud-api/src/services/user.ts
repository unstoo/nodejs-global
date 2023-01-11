import { NewUserDTO, UserDTO } from "../models";
import { UserRepository } from "../data-access/user";


const result = (error: any, data: any) => ({ error, data });
export default class UserService {
  async get(args: { id: string; }) {
    try {
      const user = await UserRepository.findById(args.id);
      return result(null, user);
    } catch (err) {
      return result(err, null);
    }
  }
  async add(user: NewUserDTO) {
    try {
      const id = await UserRepository.add(user);
      return result(null, id);
    } catch (err) {
      return result(err, null);
    }
  }
  async delete(args: { id: string; }) {
    try {
      await UserRepository.delete(args.id);
      return result(null, true);
    } catch (err) {
      return result(err, false);
    }
  }
  async patch(user: Omit<UserDTO, 'isDeleted'> ) {
    try {
      const patched = await UserRepository.patch(user);
      return result(null, patched);
    } catch (err) {
      return result(err, null);
    }
  }
  async find(args: { loginSubstring: string; limit: number; }) {
    try {
      const users = await UserRepository.getList(args.loginSubstring, args.limit);
      return result(null, users);
    } catch (err) {
      return result(err, null);
    }
  }
}