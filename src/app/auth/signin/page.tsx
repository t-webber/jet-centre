import { signIn, googleId, auth } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BirdLogo from '@/../public/bird_color.svg';
import SignInWithGoogle from '@/components/social/google';
import { LabeledSeparator } from '@/components/ui/separator';

export default async function SignInPage() {
    return (
        <div className="overflow-hidden flex flex-col p-10 h-dvh relative">
            <div className="text-[32px] mb-4 font-bold">
                <span>JET&nbsp;</span>
                <span className="text-primary">CENTER</span>
            </div>
            <div>Connexion</div>
            <div className="w-full flex-1"></div>
            <div className="w-full pb-10">
                <SignInWithGoogle />
            </div>
            <div className="py-4">
                <LabeledSeparator content="Pas encore de compte Telecom Etude" />
            </div>
            <Button variant="outline">Contacter Tom</Button>
            <div className="absolute -z-50 blur-[100px] top-[20%] w-full">
                <Image src={BirdLogo} className="absolute animate-float-around" alt=""></Image>
                <Image src={BirdLogo} className="absolute animate-float-around-2" alt=""></Image>
            </div>
        </div>
    );
}
