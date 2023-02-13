import { Request, Response } from 'express';
import { controllerErrorWithMessage, isValidString, TASKS } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { NewTaskType } from '@custom-types/index';
import { Task } from '@db/models';

const { NAME_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } = TASKS;

const sequelize = getSequelizeClient();

export const newTaskController = () => {
  return async (req: Request, res: Response) => {
    const authId = res.locals.authId as number;
    try {
      const { name, description } = req.body as NewTaskType;
      if (!isValidString(name, NAME_MAX_LENGTH) || !isValidString(description, DESCRIPTION_MAX_LENGTH)) {
        return controllerErrorWithMessage(res, 'Invalid name, description data.', 'Invalid data.');
      }
      const result = await sequelize.transaction(async () => {
        return await Task.create({
          name,
          description,
          status: 'new',
          authId
        });
      });
      return res.json(result);
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'New Task failed.');
    }
  };
};
