import { connectToDatabase } from '../../../lib/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { requestor, title, desc, priority } = req.body;

    const client = await connectToDatabase();
    const reqCollections = client.db().collection('requests');

    const result = await reqCollections.insertOne({
      requestor: requestor,
      title: title,
      desc: desc,
      priority: priority
    });

    client.close();
    res.status(201).json({ status: 'success' });
  }
};
