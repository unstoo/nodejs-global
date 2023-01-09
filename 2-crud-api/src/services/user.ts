import { NewUserDTO, UserDTO } from "../models";
import { v4 as uuidv4 } from 'uuid';

const result = (error: any, data: any) => ({ error, data });

export default class UserService {
  async get(userId: string) {
    const user = {};
    return result(null, user);
  }
  async add(user: NewUserDTO) {
    const id = uuidv4();
    const newUser = {
      ...user,
      id,
      isDeleted: false,
    };
    return result(null, id);
  }
  async delete(userId: string) {
    return result(null, userId);
  }
  async patch(user: Omit<UserDTO, 'isDeleted'> ) {
    return result(null, user);
  }
  async find(loginSubstring: string, limit: number) {
    const users = {};
    const filtered = Object
      .values(users)
      .filter(user => user.login.includes(loginSubstring) && !user.isDeleted)
      .sort((a, b) => a.login.localeCompare(b.login))
      .slice(0, limit);
    return result(null, filtered);
  }
}