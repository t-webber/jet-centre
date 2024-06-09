import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LogoGoogle from '@/../public/google.svg';

const SignInWithGoogle = () => {
    return (
        <Button type="submit" className="py-10 bg-white rounded-xl p-8 w-full" variant="default">
            <Image
                src={LogoGoogle}
                alt="Google Logo"
                width={24}
                height={24}
                className="bg-white rounded-full h-12 w-12 p-2 m-2 border-white"
            />
            <span className="text-black font-bold">Google</span>
        </Button>
    );
};

export default SignInWithGoogle;
