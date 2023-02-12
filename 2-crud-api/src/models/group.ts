import Sequelize, { Optional, ModelDefined } from 'sequelize';

export const Group = (sequelize: any) => {
  interface GroupAttributes {
    group_id?: number;
    name: string;
    permissions: string[];
  }

  type GroupCreationAttributes = Optional<GroupAttributes, 'group_id'>;

  return sequelize.define(
    'group',
    {
      group_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      permissions: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
    },
    { timestamps: false },
  ) as ModelDefined<
    GroupAttributes,
    GroupCreationAttributes
  >;
}
