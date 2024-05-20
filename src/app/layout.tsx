import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { auth, signOut } from '@/actions/auth';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
    children,
    children,
}: Readonly<{
    children: React.ReactNode;
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={cn(inter.className, 'min-h-screen flex flex-1 flex-col')}>
                <form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >
                    <button type="submit">Sign out</button>
                </form>
                {JSON.stringify(session)}
                {children}
            </body>
        </html>
    );
}
