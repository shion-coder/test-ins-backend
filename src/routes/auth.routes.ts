import { Router } from 'express';

import { verifyToken } from 'src/middlewares/verify-token';
import { register, login, me } from 'src/controllers/auth';

/* -------------------------------------------------------------------------- */

export const authRouter = Router();

/**
 * @route   POST /api/v1/users/register
 * @desc    Register user & Return JWT Token
 * @access  Public
 */
authRouter.route('/register').post(register);

/**
 * @route   POST /api/v1/users/login
 * @desc    Login & Return JWT Token
 * @access  Public
 */
authRouter.route('/login').post(login);

/**
 * @route   Get /api/v1/users/me
 * @desc    Verify token & return user data
 * @access  Private
 */
authRouter.route('/me').get(verifyToken, me);
