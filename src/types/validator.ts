import { IUser, IPost } from 'src/types';

/* -------------------------------------------------------------------------- */

export interface Validator<T> {
  errors: T;
  isValid: boolean;
}

export interface LoginData {
  email: IUser['email'];
  password: IUser['password'];
}

export interface LoginError {
  email?: IUser['email'];
  password?: IUser['password'];
}

export interface RegisterData {
  fullname: IUser['fullname'];
  username: IUser['username'];
  email: IUser['email'];
  password: IUser['password'];
}

export interface RegisterError {
  fullname?: IUser['fullname'];
  username?: IUser['username'];
  email?: IUser['email'];
  password?: IUser['password'];
}

export interface PostData {
  image: IPost['image'];
  filter?: IPost['filter'];
  caption?: IPost['caption'];
  tags: IPost['tags'];
}

export interface PostError {
  image?: IPost['image'];
}
