import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default async (req, res) => {
  const { username, password } = req.body;
  if (password.trim().length < 8) {
    res.status(422).json({ message: 'Password too short!' });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const userExists = await db
    .collection('user')
    .findOne({ username: username });

  if (userExists) {
    res
      .status(422)
      .json({ message: 'Username is taken! Please try with another username' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection('user').insertOne({
    username: username,
    password: hashedPassword
  });

  res.status(201).json({ message: 'User created successfully!' });
  client.close();
};
