import { Document, Types } from 'mongoose';

import { IUser, IComment } from 'src/types';

/* -------------------------------------------------------------------------- */

interface IPostSchema {
  image: string;
  filter?: string;
  thumbnail?: string;
  caption?: string;
  tags: Types.Array<string>;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
}

export interface IPost extends IPostSchema, Document {
  likes: Types.Array<IUser['id']>;
  comments: Types.Array<IComment['id']>;
  author: IUser['id'];
}
