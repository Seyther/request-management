import { connectToDatabase } from '../../../lib/db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectToDatabase();
    const reqCollections = client.db().collection('requests');
    const requests = await reqCollections.find().toArray();

    client.close();

    res.status(200).json({ requests: JSON.parse(JSON.stringify(requests)) });
  }
};
