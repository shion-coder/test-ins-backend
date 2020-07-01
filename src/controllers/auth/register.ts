import { Request, Response } from 'express';

import { User } from 'src/model';

import { asyncHandler } from 'src/middlewares';
import { validateRegister } from 'src/validation';
import { RegisterData } from 'src/types';

/* -------------------------------------------------------------------------- */

export const register = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    /**
     * Validate input
     */

    const { fullname = '', username = '', email = '', password = '' }: RegisterData = req.body;
    const registerData = { fullname, username, email, password };

    const { errors, isValid } = await validateRegister(registerData);

    if (!isValid) {
      return res.json({ errors });
    }

    /**
     * Create new user & return token
     */

    // const user = await User.create({ fullname, username, email, password });
    const user = await new User(registerData).save();

    return res.json({ token: user.getToken() });
  },
);
