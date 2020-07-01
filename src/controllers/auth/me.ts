import { Response } from 'express';

import { User } from 'src/model';

import { asyncHandler } from 'src/middlewares';
import { AuthRequest, TokenPayload } from 'src/types';

/* -------------------------------------------------------------------------- */

export const me = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<Response> => {
    const { id } = req.decodeData as TokenPayload;

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ error: `No user found for ID ${id}` });
    }

    return res.json({ user });
  },
);
