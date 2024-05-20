'use server';

import { signIn } from '@/actions/auth';
import { Button } from './ui/button';

export default async function SignInPage() {
    return (
        <form
            action={async () => {
                'use server';
                await signIn();
            }}
        >
            <Button type="submit">SignIn</Button>
        </form>
    );
}
