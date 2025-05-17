import { User, JWT as DefaultJWT } from 'next-auth';

type ExtendedUser = User & {
    access_token: string;
    refresh_token: string;
    position: string;
    firstName: string;
    lastName: string;
};

type ExtendJWT = DefaultJWT & {
    firstName: string;
    lastName: string;
};

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }
}

declare module 'next-auth/jwt' {
    type JWT = ExtendJWT;
}
