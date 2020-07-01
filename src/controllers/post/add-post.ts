import { Request, Response } from 'express';

import { Post } from 'src/model';

import { asyncHandler } from 'src/middlewares';

/* -------------------------------------------------------------------------- */

export const addPost = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const posts = await Post.find();

    return res.json({ data: posts });
  },
);
