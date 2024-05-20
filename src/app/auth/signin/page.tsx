import { signIn, googleId } from '@/actions/auth';

export default async function SignInPage() {
    return (
        <div className="flex flex-grow flex-col">
            <form
                action={async () => {
                    'use server';
                    await signIn(googleId);
                }}
            >
                <button type="submit">
                    <span>Sign in with Google</span>
                </button>
            </form>
        </div>
    );
}
