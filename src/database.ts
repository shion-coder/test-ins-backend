import mongoose from 'mongoose';

import { MONGODB_URI } from 'src/config';

/* -------------------------------------------------------------------------- */

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log('\x1b[32m' + '[MongoDB] Database is connected');
  } catch {
    console.log('\x1b[31m' + '[MongoDB] Connection error');
  }
};
