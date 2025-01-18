import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LogoGoogle from '@/../public/google.svg';
import { googleId, signIn } from '@/actions/auth';

export default function SignInWithGoogle() {
    return (
        <form
            action={async () => {
                'use server';
                await signIn(googleId);
            }}
        >
            <Button
                type="submit"
                className="py-28 bg-white hover:bg-neutral-300 rounded-xl p-8 w-full flex space-x-2 flex-row justify-center items-center"
                variant="default"
            >
                <Image
                    src={LogoGoogle}
                    alt="Google Logo"
                    width={24}
                    height={24}
                    className="h-12 w-12 "
                />
                <span className="text-black">Continuer avec Google</span>
            </Button>
        </form>
    );
}
