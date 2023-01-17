import { Request, Response } from 'express';
import { controllerErrorWithMessage, isValidString } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { DecodedPermission, NewTaskType } from '@custom-types/index';
import { Task } from '@db/models';
import axios from 'axios';

const sequelize = getSequelizeClient();

export const newTaskController = () => {
  return async (req: Request, res: Response) => {
    const rawToken = req.headers.authorization;
    if (!rawToken) {
      return controllerErrorWithMessage(res, 'Token not provided.', 'Unauthorized.');
    }
    let token = rawToken;
    if (rawToken.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    let response;
    try {
      response = await axios.get(`http://localhost:3051/verify-token/${token}`);
      const data = response.data as DecodedPermission;
      if (!data.authenticate) {
        return controllerErrorWithMessage(res, 'Authenticate is not true.', 'Unauthorized.');
      }
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
      if (axios.isAxiosError(err)) {
        const response = err.response;
        if (response && response.status !== 200) {
          const data = response.data as { message: string | undefined };
          const message = data.message ?? 'Internal server error.';
          return res.status(400).json({ message });
        }
      }
      return controllerErrorWithMessage(res, err, 'Get All Task failed.');
    }
  };
};
