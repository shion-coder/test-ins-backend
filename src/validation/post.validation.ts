import validator from 'validator';
import isEmpty from 'is-empty';

import { Validator, PostData, PostError } from 'src/types';

/* -------------------------------------------------------------------------- */

export const validateLogin = async ({ image }: PostData): Promise<Validator<PostError>> => {
  const errors = {} as PostError;

  /**
   * Caption validation
   */

  validator.isEmpty(image) ? (errors.image = 'Image is required') : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
