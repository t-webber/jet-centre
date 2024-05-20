import type { NextAuthConfig, User } from 'next-auth';
import NextAuth from 'next-auth';
import { Provider } from 'next-auth/providers';
import Google from 'next-auth/providers/google';

export const googleId = Google({}).id;

const config = {
    providers: [Google],
    pages: {
        signIn: '/auth/signin',
        // signOut: '/auth/signout',
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
