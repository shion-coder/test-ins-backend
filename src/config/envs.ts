import { NODE_ENVS } from 'src/types';

/* -------------------------------------------------------------------------- */

export const PORT: number = Number(process.env.PORT) || 4000;

export const NODE_ENV: NODE_ENVS = (process.env.NODE_ENV as NODE_ENVS) || NODE_ENVS.DEVELOPMENT;

export const MONGODB_URI: string = process.env.MONGODB_URI || '';

export const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';

export const JWT_EXPIRE: string = process.env.JWT_EXPIRE || '1h';

export const GITHUB_CLIENT_ID: string = process.env.GITHUB_CLIENT_ID || '';

export const GITHUB_CLIENT_SECRET: string = process.env.GITHUB_CLIENT_SECRET || '';
