import { Sequelize, } from 'sequelize';

if (!process.env.PG || !process.env.TEST_LOGIN || !process.env.TEST_PASSWORD) {
  process.stderr.write('Missing PG config details.\n');
  process.exit(1);
}
const testLogin = process.env.TEST_LOGIN;
const testPassword = process.env.TEST_PASSWORD;
export const sequelize = new Sequelize(process.env.PG);

import { User } from '../models/user';
import { Group } from '../models/group';
import { UserGroup } from '../models/user_group';

const UserModel = User(sequelize);
const GroupModel = Group(sequelize);
const UserGroupModel = UserGroup(sequelize);

(async () => {
  GroupModel.belongsToMany(UserModel, { through: UserGroupModel, onDelete: 'cascade' });
  UserModel.belongsToMany(GroupModel, { through: UserGroupModel, onDelete: 'cascade' });

  try {
    await sequelize.sync({ force: true });

    const users = await UserModel.bulkCreate(
      [
        { login: testLogin, password: testPassword, age: 25 },
        { login: 'josh', password: 'safety33', age: 32 },
      ],
    );
    const grps = await GroupModel.bulkCreate([
      { name: 'admin_grp', permissions: ['READ', 'WRITE', 'DELETE'] },
      { name: 'user_grp', permissions: ['READ', 'WRITE'] },
    ]);
  } catch (error) {
    process.stderr.write(error + '\n');
  }
})();

export const Models = {
  Group: GroupModel,
  User: UserModel,
  UserGroup: UserGroupModel,
};
