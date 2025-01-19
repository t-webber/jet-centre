/**
 * In our case, the middleware's goal is to handle authentication.
 * This module exports a default function that acts as a middleware for Next.js.
 * It is responsible for redirecting or rewriting URLs based on the authentication status.
 * The module also exports a configuration object for specifying the URL matcher.
 * The middleware is great as it intercepts all requests before they reach the page.
 *
 * @file middleware.ts
 * @donotmove
 */

import { NextResponse } from 'next/server';

import { auth } from './actions/auth';

import type { Session } from 'next-auth';
import type { NextRequest } from 'next/server';

/**
 * Extends the internal NextAuth type to add `auth` session.
 *
 * @interface NextAuthRequest
 * @extends {NextRequest}
 */
interface NextAuthRequest extends NextRequest {
    auth: Session | null;
}

/**
 * Main function of the middleware.
 */
export default auth((request: NextAuthRequest) => {
    const session = request.auth;
    if (!process.env.DEV_MODE && (!session || !session.user || !session.user.email)) {
        return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
    }
});

/**
 * @property {string[]} matcher - An array of URL patterns to match against.
 * The middleware will solely be applied to URLs that match this patterns.
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|auth|_next/static|_next/image|favicon.ico|public).*)'
    ]
};
