import { Request, Response } from 'express';
import { controllerErrorWithMessage, isValidString } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { NewTaskType } from '@custom-types/index';
import { Task } from '@db/models';

const sequelize = getSequelizeClient();

export const newTaskController = () => {
  return async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body as NewTaskType;
      if (!isValidString(name) || !isValidString(description)) {
        return controllerErrorWithMessage(res, 'Invalid name, description data.', 'Invalid data.');
      }
      const result = await sequelize.transaction(async () => {
        return await Task.create({
          name,
          description,
          status: 'new'
        });
      });
      return res.json(result);
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'New Task failed.');
    }
  };
};
