import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
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
            <body className={cn('dark bg-background h-dvh overflow-hidden', inter.className)}>
                {children}
            </body>
        </html>
    );
}
