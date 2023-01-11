import { v4 as uuidv4 } from 'uuid';
import { NewUserDTO, UserDTO } from "../models";
import Knex from 'knex';

const knex = Knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'myapp_test'
  }
});

export class UserRepository {
  private static getId() {
    return uuidv4();
  }
  static async findById(id: string) {
    const res = await knex.select('*').from('users').where('id', id);
    return res;
  }
  static async add(user: NewUserDTO) {
    const id = this.getId();
    const userRecord = {
      ...user,
      id,
      isDeleted: false,
    };
    return id;
  }
  static async delete(id: string) {
    return true;
  }
  static async patch(user: Omit<UserDTO, 'isDeleted'>) {
    return { ...user };
  }
  static async getList(loginSubstring: string, limit: number) {
    const users: Record<string, UserDTO> = {};
    const res = await knex
      .select('*')
      .from('users')
      .whereILike('login', `%${loginSubstring}%`)
      .limit(limit);
    // can RDB, objectDB, in-memory storage, file, call to another API etc...
    // the place to solve data reading/writing tasks (caching, freezing, backups)
    return res;
  }
}