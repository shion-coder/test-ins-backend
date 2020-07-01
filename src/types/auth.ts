import { Request } from 'express';
import { Socket } from 'socket.io';

import { IUser } from 'src/types';

/* -------------------------------------------------------------------------- */

export interface TokenPayload {
  id: IUser['id'];
  email: IUser['email'];
}

export interface AuthRequest extends Request {
  decodeData?: TokenPayload;
}

export interface AuthSocket extends Socket {
  user?: TokenPayload;
}
