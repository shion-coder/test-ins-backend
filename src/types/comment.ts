import { Document } from 'mongoose';

import { IUser, IPost } from 'src/types';

/* -------------------------------------------------------------------------- */

interface ICommentSchema {
  text: string;
}

interface ICommentBase extends ICommentSchema, Document {}

export interface IComment extends ICommentBase {
  user: IUser['id'];
  post: IPost['id'];
}

export interface ICommentPopulated extends ICommentBase {
  user: IUser;
  post: IPost;
}
