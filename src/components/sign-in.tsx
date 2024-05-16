'use server';

import { auth, signIn } from '@/actions/auth';
import React from 'react';

export default async function SignInLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    console.log(0);
    if (!session || !session.user) {
        signIn();
        return <>Please sign in</>;
    } else {
        return (
            <div>
                Your are signed in as {session.user.name} ({session.user.email}).
                {children}
            </div>
        );
    }
}
