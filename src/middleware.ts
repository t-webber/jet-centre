import { NextResponse } from 'next/server';

import { auth } from './actions/auth';

import type { Session } from 'next-auth';
import type { NextRequest } from 'next/server';

interface NextAuthRequest extends NextRequest {
    auth: Session | null;
}

export default auth((request: NextAuthRequest) => {
    const session = request.auth;
    if (!process.env.DEV_MODE && (!session || !session.user || !session.user.email)) {
        return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
    }
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|auth|_next/static|_next/image|favicon.ico).*)',
    ],
};
