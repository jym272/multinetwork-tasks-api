import { NextFunction, Request, Response } from 'express';
import { controllerErrorWithMessage } from '@utils/index';
import axios from 'axios';
import { DecodedPermission } from '@custom-types/index';

export const handleTokenController = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
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
      next();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const response = err.response;
        if (response && response.status !== 200) {
          const data = response.data as { message: string | undefined };
          const message = data.message ?? 'Internal server error.';
          return res.status(400).json({ message });
        }
      }
      return controllerErrorWithMessage(res, err, 'Failed token verification.');
    }
  };
};
