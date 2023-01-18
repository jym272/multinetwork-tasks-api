import { Request, Response } from 'express';
import { controllerErrorWithMessage, isValidId, isValidStatus, isValidString } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { TaskType } from '@custom-types/index';
import { Task } from '@db/models';

const sequelize = getSequelizeClient();

export const updateTaskController = () => {
  return async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isValidId(id)) {
      return controllerErrorWithMessage(res, new Error('Invalid id.'), 'Invalid id.');
    }
    try {
      const { name, description, status } = req.body as TaskType;

      const updateObject: Partial<TaskType> = {};
      if (name && isValidString(name)) {
        updateObject.name = name;
      }
      if (description && isValidString(description)) {
        updateObject.description = description;
      }
      if (isValidStatus(status)) {
        updateObject.status = status;
      }
      const result = await sequelize.transaction(async () => {
        return await Task.update(updateObject, {
          where: {
            id
          }
        });
      });
      const msg = result[0] === 1 ? 'Task updated.' : 'Task not updated.';
      return res.json({ message: msg });
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'Update Task failed.');
    }
  };
};
