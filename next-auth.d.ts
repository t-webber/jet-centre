import { User, JWT as DefaultJWT } from 'next-auth';

type ExtendedUser = User & {
    access_token: string;
    refresh_token: string;
    position: string;
    given_name: string;
    family_name: string;
};

type ExtendJWT = DefaultJWT & {
    given_name: string;
    family_name: string;
};

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }
}

declare module 'next-auth/jwt' {
    type JWT = ExtendJWT;
}
