import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          username: credentials.username
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Wrong password entered!');
        }

        client.close();
        return { username: user.username };
      }
    })
  ],
  callbacks: {
    async session(session, token, user) {
      return { ...session, ...token };
    },
    async jwt(token, user, account, profile, isNewUser) {
      token = { ...token, ...user };
      return token;
    }
  }
});
