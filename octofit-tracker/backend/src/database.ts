import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectDatabase = async () => {
  return mongoose.connect(MONGO_URI);
};

export const getMongoUri = () => MONGO_URI;

export default mongoose;
