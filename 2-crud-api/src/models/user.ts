

import Sequelize, { Optional, ModelDefined } from 'sequelize';

export const User = (sequelize: any) => {
  interface UserAttributes {
    user_id?: string;
    login: string;
    password: string;
    age: number;
    is_deleted?: boolean;
  }

  type UserCreationAttributes = Optional<UserAttributes, 'user_id' | 'is_deleted'>;

  return  sequelize.define(
    'user',
    {
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { timestamps: false },
  ) as ModelDefined<
    UserAttributes,
    UserCreationAttributes
  >;
}
