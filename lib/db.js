import { MongoClient, ObjectID } from 'mongodb';

export const connectToDatabase = async () => {
  return await MongoClient.connect(process.env.MONGODB_URI);
};

export const getObjectID = id => {
  return new ObjectID(id);
};
