import { Request, Response } from 'express';
import { controllerErrorWithMessage, isValidId, isValidStatus, isValidString, TASKS } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { TaskType } from '@custom-types/index';
import { Task } from '@db/models';

const sequelize = getSequelizeClient();
const { NAME_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } = TASKS;

export const updateTaskController = () => {
  return async (req: Request, res: Response) => {
    const id = req.params.id;
    const authId = res.locals.authId as number;

    if (!isValidId(id)) {
      return controllerErrorWithMessage(res, new Error('Invalid id.'), 'Invalid id.');
    }
    try {
      const { name, description, status } = req.body as TaskType;

      const updateObject: Partial<TaskType> = {};
      if (name && isValidString(name, NAME_MAX_LENGTH)) {
        updateObject.name = name;
      }
      if (description && isValidString(description, DESCRIPTION_MAX_LENGTH)) {
        updateObject.description = description;
      }
      if (isValidStatus(status)) {
        updateObject.status = status;
      }
      const result = await sequelize.transaction(async () => {
        return await Task.update(updateObject, {
          where: {
            id,
            authId
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
