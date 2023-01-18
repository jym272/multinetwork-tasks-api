import { DataTypes, Sequelize } from 'sequelize';
import { Task } from '@db/models';

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
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'name'
      },
      description: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'description'
      },
      status: {
        type: DataTypes.ENUM('new', 'in-progress', 'done'),
        allowNull: false,
        field: 'status'
      }
    },
    {
      sequelize,
      tableName: 'task'
    }
  );
};
