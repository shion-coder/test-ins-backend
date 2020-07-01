import { Schema, Model, HookNextFunction, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUser, TokenPayload } from 'src/types';
import { JWT_SECRET, JWT_EXPIRE } from 'src/config';

/* -------------------------------------------------------------------------- */

const userSchema: Schema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Please enter your full name'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, 'Username should be atleast minimum of 3 characters'],
    maxlength: [12, 'Username should be maximum of 12 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password should be atleast minimum of 6 characters'],
    maxlength: [12, 'Password should be maximum of 12 characters'],
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/douy56nkf/image/upload/v1592377257/twitter-build/znfpesuva3jfmexs6mus.jpg',
  },
  bio: {
    type: String,
    maxlength: 130,
  },
  website: {
    type: String,
    maxlength: 65,
  },
  githubId: Number,
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followersCount: {
    type: Number,
    default: 0,
  },
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followingCount: {
    type: Number,
    default: 0,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  postCount: {
    type: Number,
    default: 0,
  },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  private: {
    type: Boolean,
    default: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Hass pasword before save user
 */

userSchema.pre('save', async function (this: IUser, next: HookNextFunction): Promise<void> {
  if (this.password && this.isModified('password')) {
    try {
      const salt = await genSalt(10);

      this.password = await hash(this.password, salt);
    } catch {
      throw new Error('Error hashing user password');
    }
  }

  next();
});

/**
 * Compare passsword
 */

userSchema.methods.comparePassword = async function (this: IUser, password: string): Promise<boolean> {
  try {
    const isMatch: boolean = await compare(password, this.password);

    return isMatch;
  } catch {
    throw new Error('Error comparing password');
  }
};

/**
 * Get token
 */

userSchema.methods.getToken = function (this: IUser): string {
  const payload: TokenPayload = {
    id: this.id,
    email: this.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export const User: Model<IUser> = model<IUser>('User', userSchema);
