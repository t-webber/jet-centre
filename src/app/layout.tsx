import { Inter } from 'next/font/google';
import './globals.css';
import { auth, signOut } from '@/actions/auth';
import SignInLayout from '@/components/sign-in';
import { Button } from '@/components/ui/button';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
    children,
}: Readonly<{
    children: React.ReactNode;
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <SignInLayout>
                    <form
                        onSubmit={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <Button type="submit">Sign Out</Button>
                    </form>
                    {children}
                </SignInLayout>
            </body>
        </html>
    );
}
