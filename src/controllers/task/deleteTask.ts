import { Request, Response } from 'express';
import { controllerErrorWithMessage, isValidId } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { Task } from '@db/models';

const sequelize = getSequelizeClient();

export const deleteTaskController = () => {
  return async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isValidId(id)) {
      return controllerErrorWithMessage(res, new Error('Invalid id.'), 'Invalid id.');
    }
    try {
      const result = await sequelize.transaction(async () => {
        return await Task.destroy({
          where: {
            id
          }
        });
      });
      const msg = result === 1 ? 'Task deleted.' : 'Task not deleted.';
      return res.json({ message: msg });
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'Update Task failed.');
    }
  };
};
