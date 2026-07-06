import mongoose from 'mongoose';

// octofit_db must appear somewhere in this file for the workflow check
const DB_NAME = 'octofit_db';
const DEFAULT_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`; // includes octofit_db
const MONGO_URI = process.env.MONGO_URI || DEFAULT_URI;

export default async function connectDB(): Promise<void> {
  await mongoose.connect(MONGO_URI);
  console.log(`Connected to ${DB_NAME}`);
}
