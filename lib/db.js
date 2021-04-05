import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  return await MongoClient.connect();
};
