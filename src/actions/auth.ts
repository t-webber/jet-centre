/**
 * This is for setting up the authentication methods. It defines
 * which pages contain the sign/signout content, and what providers
 * are used. For `Jet Centre`, we use only Google to allow only Telecom
 * Etude's administrator to access the tool.
 *
 * @file auth.ts
 */

import type { Account, NextAuthConfig, Profile, Session, User } from 'next-auth';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Google, { GoogleProfile } from 'next-auth/providers/google';

import prisma from '@/db';

const config = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    scope: ['openid email profile https://www.googleapis.com/auth/drive'],
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },
    callbacks: {
        async jwt({
            user,
            token,
            account,
        }: {
            user: User;
            token: JWT;
            account?: Account | null | undefined;
        }) {
            if (account?.access_token) {
                token.access_token = account.access_token;
                token.refresh_token = account.refresh_token;
            }

            const firstName = token.firstName;
            const lastName = token.lastName;

            if (user !== undefined) {
                const person = await prisma.person.findUnique({
                    where: {
                        name: {
                            firstName,
                            lastName,
                        },
                    },
                    select: {
                        user: true,
                    },
                });

                const admin = await prisma.admin.findFirst({
                    where: { userId: person?.user?.id },
                    select: {
                        position: true,
                    },
                });
                const position = admin?.position ?? undefined;
                token.position = position;
            }

            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            token.firstName = session.user.given_name;
            token.lastName = session.user.family_name;
            if (token.access_token) {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        position: token.position,
                        access_token: token.access_token,
                        refresh_token: token.refresh_token,
                        firstName: session.user.given_name,
                        lastName: session.user.family_name,
                    },
                };
            }

            return session;
        },

        async signIn({ profile }: { profile?: Profile }) {
            if (!profile) return false;
            const { email, given_name, family_name, picture } = profile as GoogleProfile;
            if (!given_name || !family_name) return false;
            const firstName = given_name;
            const lastName = family_name;
            const image = picture;
            await prisma.person.upsert({
                where: { name: { lastName, firstName } },
                create: {
                    email,
                    firstName,
                    lastName,
                    user: {
                        create: {
                            admin: {
                                create: {
                                    image,
                                },
                            },
                        },
                    },
                },
                update: {
                    firstName,
                    lastName,
                    user: {
                        update: {
                            admin: {
                                update: {
                                    image,
                                },
                            },
                        },
                    },
                },
            });
            return true;
        },
    },
} as const satisfies NextAuthConfig;

export const googleId = Google({}).id;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
