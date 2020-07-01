import { createServer, Server } from 'http';
import socketIo from 'socket.io';
import jwt from 'jsonwebtoken';

import { app } from 'src/app';
import { connectDb } from 'src/database';

import { PORT, JWT_SECRET } from 'src/config';
import { TokenPayload, AuthSocket, SocketEvent } from 'src/types';

/* -------------------------------------------------------------------------- */

/* Connect database */
connectDb();

/**
 * Setup server and socket
 */

const server: Server = createServer(app);
const io = socketIo(server);

/* Authenticate before establishing a socket connection */
io.use((socket: AuthSocket, next): void => {
  const { token } = socket.handshake.query;

  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as TokenPayload;

    socket.user = user;

    return next();
  } catch {
    return next(new Error('Invalid token'));
  }
}).on(SocketEvent.CONNECTION, (socket: AuthSocket): void => {
  socket.user && socket.join(socket.user.id);

  console.log('Socket connected:', socket.id);
});

server.listen(PORT, () => {
  console.log('\x1b[32m' + `[Express] Server listening on port ${PORT}`);
});
