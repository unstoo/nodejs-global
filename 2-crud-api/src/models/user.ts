

// import {
//   DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin, Association
// } from 'sequelize';
import { sequelize } from '../data-access/user';

// export class GroupModel extends Model<
//   InferAttributes<GroupModel>,
//   InferCreationAttributes<GroupModel>
// > {
//   declare group_id: CreationOptional<string>;
//   declare name: string;
//   declare premissions: Array<string>;
// }

// GroupModel.init(
//   {
//     group_id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     premissions: {
//       type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
//       allowNull: false,
//       defaultValue: [],
//     },
//   },
//   {
//     timestamps: false,
//     tableName: 'groups',
//     sequelize
//   }
// );

// export class UserModel extends Model<
//   InferAttributes<UserModel>,
//   InferCreationAttributes<UserModel>
// > {
//   declare user_id: CreationOptional<string>;
//   declare login: string;
//   declare password: string;
//   declare age: number;
//   declare is_deleted: CreationOptional<boolean>;

//   declare addGroup: HasManyAddAssociationMixin<GroupModel, string>;
//   declare static associations: {
//     groups: Association<UserModel, GroupModel>;
//   };
// }

// UserModel.init(
//   {
//     user_id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     login: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     password: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     age: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false
//     },
//     is_deleted: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//       defaultValue: false,
//     },
//   },
//   {
//     timestamps: false,
//     tableName: 'users',
//     sequelize
//   }
// );

// // const User_Group = sequelize.define('User_Profile', {}, { timestamps: false });
// GroupModel.belongsToMany(UserModel, {
//   through: 'UsersSalons',
//   as: 'group',
//   foreignKey: 'group_id',
//   otherKey: 'user_id',
//   timestamps: false,
// });
// UserModel.belongsToMany(GroupModel, {
//   through: 'UsersSalons',
//   as: 'user',
//   foreignKey: 'user_id',
//   otherKey: 'group_id',
//   timestamps: false,
// });


// (async() => {
//   await sequelize.sync({ force: true });
  
//   const usr = await UserModel.create({
//     login: 'ha',
//     password: '55',
//     age: 22
//   })

//   const grp = await GroupModel.create({
//     name: 'user',
//     premissions: ['READ', 'WRITE']
//   })

//   const u = await UserModel.findByPk(usr.user_id);
//   console.log(u?.addGroup)

// })()


import Sequelize from 'sequelize';

export const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    isDeselected: {
      type: Sequelize.BOOLEAN,
    },
  },
  { timestamps: false },
);

export const Group = sequelize.define(
  'group',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    permissions: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  },
  { timestamps: false },
);

const UserGroup = sequelize.define('UserGroup', {}, { timestamps: false });

Group.belongsToMany(User, { through: UserGroup });
User.belongsToMany(Group, { through: UserGroup });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await User.bulkCreate(
      [
        { login: 'a', password: '123', groups: [{ name: 'group a' }, { name: 'group b' }] },
        { login: 'b', password: '321', groups: [{ name: 'group c' }, { name: 'group d' }] },
      ],
      { include: [Group] },
    );

    // test
    const userIds = [1, 2];
    const groupId = 3;
    const user = await User.findOne({ where: { id: userIds } });
    const group = await Group.findOne({ where: { id: groupId } });
    // @ts-ignore
    const result = await user.addGroup(group);
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
