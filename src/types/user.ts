import { Document, Types } from 'mongoose';

import { IPost } from 'src/types';

/* -------------------------------------------------------------------------- */

interface IUserSchema {
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  website?: string;
  githubId?: number;
  followersCount: number;
  followingCount: number;
  postCount: number;
  private: boolean;
  confirmed: boolean;
  createdAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  getToken: () => string;
}

export interface IUser extends IUserSchema, Document {
  followers: Types.Array<IUser['id']>;
  following: Types.Array<IUser['id']>;
  posts: Types.Array<IPost['id']>;
  bookmarks: Types.Array<IPost['id']>;
}
