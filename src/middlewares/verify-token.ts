import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AuthRequest, TokenPayload } from 'src/types';
import { JWT_SECRET } from 'src/config';

/* -------------------------------------------------------------------------- */

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  let token: string | undefined = undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split('Bearer ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'You need to be logged in to visit this route' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    req.decodeData = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid Token' });
  }
};
