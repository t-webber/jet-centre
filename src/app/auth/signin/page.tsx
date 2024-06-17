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
        <div className="overflow-hidden p-10 flex flex-col h-dvh relative md:flex-row md:justify-around md:items-center">
            <Image
                src={BirdLogo}
                alt="logo telecom etude"
                className="hidden md:block max-w-[30%] max-h-[50%]"
            />
            <div className="flex flex-col flex-1 md:flex-none items-center space-y-10">
                <div className="text-5xl font-bold">
                    <span>JET&nbsp;</span>
                    <span className="text-primary">CENTER</span>
                </div>
                <div className="md:hidden text-3xl">Connexion</div>
                <div className="w-full flex-1 md:hidden"></div>
                <div className="md:p-10 md:bg-box-background md:rounded md:h-fit space-y-14 w-full md:w-auto">
                    <span className="hidden md:block text-3xl">Connexion</span>
                    <div className="w-full">
                        <SignInWithGoogle />
                    </div>
                    <div>
                        <div className="pb-4">
                            <LabeledSeparator content="Pas&nbsp;encore&nbsp;de&nbsp;compte&nbsp;Telecom&nbsp;Etude&nbsp;?" />
                        </div>
                        <Button variant="outline" className="bg-box-background w-full">
                            Contacter Tom
                        </Button>
                    </div>
                    <div className="absolute -z-50 blur-[100px] top-[10%] w-full md:hidden">
                        <Image
                            src={BirdLogo}
                            className="absolute animate-float-around"
                            alt=""
                        ></Image>
                        <Image
                            src={BirdLogo}
                            className="absolute animate-float-around-2"
                            alt=""
                        ></Image>
                    </div>
                </div>
            </div>
        </div>
    );
}
