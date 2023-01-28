

import {
  DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional,
} from 'sequelize';
import { sequelize } from '../data-access/user';

export class GroupModel extends Model<
  InferAttributes<GroupModel>,
  InferCreationAttributes<GroupModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare premissions: Array<string>;
}

GroupModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    premissions: {
      type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    timestamps: false,
    tableName: 'groups',
    sequelize
  }
);
