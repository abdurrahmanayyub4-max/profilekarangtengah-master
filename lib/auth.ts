// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id:       String(user.id),
          name:     user.name ?? user.username,
          username: user.username,
          role:     user.role,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 10 * 60,
    updateAge: 5 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id       = user.id;
        token.username = (user as any).username;
        token.role     = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id       = token.id;
        (session.user as any).username = token.username;
        (session.user as any).role     = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error:  '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
};
