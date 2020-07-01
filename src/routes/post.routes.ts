import { Router } from 'express';

import { verifyToken } from 'src/middlewares/verify-token';
import { getPosts, addPost } from 'src/controllers/post';

/* -------------------------------------------------------------------------- */

export const postRouter = Router();

/**
 * @route   GET /api/v1/posts
 * @desc    Get all post
 * @access  Public
 */
postRouter.route('/').get(getPosts).post(verifyToken, addPost);
