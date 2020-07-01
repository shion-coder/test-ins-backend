import validator from 'validator';
import isEmpty from 'is-empty';

import { User } from 'src/model';

import { Validator, LoginData, LoginError, IUser } from 'src/types';

/* -------------------------------------------------------------------------- */

export const validateLogin = async ({ email, password }: LoginData): Promise<Validator<LoginError>> => {
  const errors = {} as LoginError;

  let existingEmail: IUser | null = null;
  let isMatch = false;

  /**
   * Find existing email and compare password
   */

  if (!validator.isEmpty(email) && validator.isEmail(email)) {
    try {
      existingEmail = await User.findOne({ email });

      if (existingEmail) {
        isMatch = await existingEmail.comparePassword(password);
      }
    } catch {
      throw new Error('Error finding user email or comparing password');
    }
  }

  /**
   * Email validation
   */

  validator.isEmpty(email)
    ? (errors.email = 'Email is required')
    : !validator.isEmail(email)
    ? (errors.email = 'Invalid email format')
    : !existingEmail
    ? (errors.email = 'Email not found')
    : null;

  /**
   * Password validation
   */

  validator.isEmpty(password)
    ? (errors.password = 'Password is required')
    : !isMatch && !errors.email
    ? (errors.password = 'Password incorrect')
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
