import { Schema, Model, model } from 'mongoose';

import { IComment } from 'src/types';

/* -------------------------------------------------------------------------- */

const commentSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Please enter the comment'],
    trim: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
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

export const Comment: Model<IComment> = model<IComment>('Comment', commentSchema);
