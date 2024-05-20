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
            <body className={cn(inter.className, 'h-dvh dark')}>{children}</body>
        </html>
    );
}
