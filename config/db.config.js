import mongoose from 'mongoose';
import { envConfig } from './env.config.js';

export const connectToDB = async () => {
    await mongoose.connect(envConfig.DATABASE_URL);
    return mongoose.connection;
};
