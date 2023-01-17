import { Request, Response } from 'express';
import { controllerErrorWithMessage } from '@utils/index';
import axios from 'axios';
import { Task } from '@db/models';
import { DecodedPermission } from '@custom-types/index';

export const getAllController = () => {
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
        return controllerErrorWithMessage(res, 'Unauthorized.', 'Unauthorized.');
      }
      const tasks = await Task.findAll();
      return res.json(tasks);
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
