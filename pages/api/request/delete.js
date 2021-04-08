import { connectToDatabase, getObjectID } from '../../../lib/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { _id } = req.body;

    const client = await connectToDatabase();
    const reqCollections = client.db().collection('requests');

    const result = await reqCollections.deleteOne({
      _id: getObjectID(_id)
    });

    res.status(201).json('deleted');
  }
};
