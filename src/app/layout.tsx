import './globals.css';
import React from 'react';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

const avenir = localFont({
    src: [
        {
            path: '../fonts/Avenir-Bold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../fonts/Avenir-Demi.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../fonts/Avenir-DemiIt.otf',
            weight: '600',
            style: 'italic',
        },
        {
            path: '../fonts/Avenir-It.otf',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../fonts/Avenir-Regular.otf',
            weight: '400',
            style: 'normal',
        },
    ],
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={cn(avenir.className, 'dark h-dvh')}>{children}</body>
        </html>
    );
}
