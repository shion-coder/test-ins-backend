import { Schema, Model, model } from 'mongoose';

import { IPost } from 'src/types';

/* -------------------------------------------------------------------------- */

const postSchema: Schema = new Schema({
  image: {
    type: String,
    required: true,
  },
  filter: String,
  thumbnail: String,
  caption: String,
  tags: [{ type: String, lowercase: true }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likesCount: {
    type: Number,
    default: 0,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  commentsCount: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post: Model<IPost> = model<IPost>('Post', postSchema);
