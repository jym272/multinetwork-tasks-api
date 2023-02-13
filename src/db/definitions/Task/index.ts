import { DataTypes, Sequelize } from 'sequelize';
import { Task } from '@db/models';
import { TASKS } from '@utils/constants';
const { NAME_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } = TASKS;

export const init = (sequelize: Sequelize) => {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      name: {
        type: DataTypes.STRING(NAME_MAX_LENGTH),
        allowNull: false,
        field: 'name'
      },
      description: {
        type: DataTypes.STRING(DESCRIPTION_MAX_LENGTH),
        allowNull: false,
        field: 'description'
      },
      status: {
        type: DataTypes.ENUM('new', 'in-progress', 'done'),
        allowNull: false,
        field: 'status'
      },
      authId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'auth_id'
      }
    },
    {
      sequelize,
      tableName: 'task'
    }
  );
};
