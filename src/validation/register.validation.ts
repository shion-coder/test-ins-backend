import validator from 'validator';
import isEmpty from 'is-empty';

import { User } from 'src/model';

import { Validator, RegisterData, RegisterError, IUser } from 'src/types';

/* -------------------------------------------------------------------------- */

export const validateRegister = async ({
  fullname,
  username,
  email,
  password,
}: RegisterData): Promise<Validator<RegisterError>> => {
  const errors = {} as RegisterError;

  let existingUsername: IUser | null = null;
  let existingEmail: IUser | null = null;

  /**
   * Find existing username & email
   */

  if (!validator.isEmpty(username)) {
    try {
      existingUsername = await User.findOne({ username });
    } catch {
      throw new Error('Error finding username');
    }
  }

  if (!validator.isEmpty(email) && validator.isEmail(email)) {
    try {
      existingEmail = await User.findOne({ email });
    } catch {
      throw new Error('Error finding user email');
    }
  }

  /**
   * First name validation
   */

  validator.isEmpty(fullname) ? (errors.fullname = 'Full name is required') : null;

  /**
   * Username validation
   */

  validator.isEmpty(username)
    ? (errors.username = 'Username is required')
    : !validator.isLength(username, { min: 3, max: 12 })
    ? (errors.username = 'Username must be between 3 and 12 characters')
    : existingUsername
    ? (errors.username = 'This username is already taken')
    : null;

  /**
   * Email validation
   */

  validator.isEmpty(email)
    ? (errors.email = 'Email is required')
    : !validator.isEmail(email)
    ? (errors.email = 'Invalid email format')
    : existingEmail
    ? (errors.email = 'This email is already taken')
    : null;

  /**
   * Password validation
   */

  validator.isEmpty(password)
    ? (errors.password = 'Password is required')
    : !validator.isLength(password, { min: 6, max: 12 })
    ? (errors.password = 'Password must be between 6 and 12 characters')
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
