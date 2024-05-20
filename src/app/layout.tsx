import { Inter } from 'next/font/google';
import './globals.css';
import { auth } from '@/actions/auth';
import React from 'react';
import SignInPage from '@/components/sign-in';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
    children,
    children,
}: Readonly<{
    children: React.ReactNode;
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang="fr">
            <body className={inter.className}>
                {!session || !session.user || !session.user.email ? (
                    <SignInPage />
                ) : (
                    <>
                        <Link href="/api/auth/signout">Sign Out</Link>
                        {children}
                    </>
                )}
            </body>
        </html>
    );
}
