/**
 * This is for setting up the authentication methods. It defines
 * which pages contain the sign/signout content, and what providers
 * are used. For `Jet Centre`, we use only Google to allow only Telecom
 * Etude's administrator to access the tool.
 *
 * @file auth.ts
 */

import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const googleId = Google({}).id;

const config = {
    providers: [Google],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout'
    }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
