import { Request, Response } from 'express';
import { controllerErrorWithMessage } from '@utils/index';
import { Task } from '@db/models';

export const getAllController = () => {
  return async (req: Request, res: Response) => {
    const authId = res.locals.authId as number;
    try {
      const tasks = await Task.findAll({
        where: {
          authId
        }
      });
      return res.json(tasks);
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'Get All Task failed.');
    }
  };
};
