import { signIn, googleId, auth } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default async function SignInPage() {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col lg:flex-row flex-1 justify-around items-center">
                <div className="space-y-10 flex-1 flex flex-col items-center justify-center max-w-[504px]">
                    <Image
                        src="/bird_logo_full.svg"
                        alt="Telecom Etude Logo"
                        width={555}
                        height={555}
                        className="w-[50%]"
                    />
                    <h1 className="text-4xl text-je-red">Telecom Etude</h1>
                    <p className="text-center">
                        Notre expertise à votre service afin de vous accompagner dans votre
                        transition <strong className="text-primary font-normal">numérique</strong>.
                    </p>
                    <Link
                        className=" bg-gradient-to-tl from-primary/80 p-2 px- to-je-red/90 rounded flex items-center space-x-2"
                        href="https://www.telecom-etude.fr"
                    >
                        <p>En savoir plus</p>
                        <FaArrowRight />
                    </Link>
                    <p className="text-center">
                        Vous êtes (futur) administrateur de Telecom Etude&nbsp;? Accéder à
                        l&apos;outil de gestion en cliquant ci-dessous.
                    </p>
                    <form
                        action={async () => {
                            'use server';
                            await signIn(googleId);
                        }}
                        className="w-full"
                    >
                        <button
                            type="submit"
                            className="bg-gradient-to-br from-je-red/90 to-primary/75 w-full rounded border-je-red/20 border-8"
                        >
                            <div className="flex p-2 items-center justify-around sm:w-full flex-col sm:flex-row">
                                <Image
                                    src="/google.svg"
                                    alt="Google Logo"
                                    width={24}
                                    height={24}
                                    className="bg-white rounded-full h-14 w-14 p-2 m-2 border-white"
                                />
                                <div className="flex flex-col ">
                                    <p className="sm:w-fit sm:text-justify text-center">
                                        Authentification avec Google
                                    </p>
                                    <p className="sm:w-fit sm:text-justify text-center">
                                        Utilisez votre compte telecom-etude.fr
                                    </p>
                                </div>
                            </div>
                        </button>
                    </form>
                    <p className="text-center">Une erreur est survenue ? Une question ?</p>
                    <Link
                        className="bg-gradient-to-tl from-primary/80 p-2 px-4 to-je-red/90  rounded"
                        href="mailto:jet.info@telecom-etude.fr"
                    >
                        Contactez-nous !
                    </Link>
                </div>
                <div className="flex-1 max-w-[504px] 2xl:max-w-[720px] hidden lg:block">
                    <section>
                        <h2 className="p-10 pl-0 text-je-red text-3xl">Qui sommes nous&nbsp;?</h2>
                        <p>
                            Fondée en 1979,{' '}
                            <Link
                                className="text-link hover:underline"
                                href="https://telecom-etude.fr"
                            >
                                Telecom Etude
                            </Link>{' '}
                            est la la Junior-Entreprise de Télécom Paris, école d&apos;ingénieurs de
                            premier plan dans les technologies du numérique, notamment de la data
                            science. Fort de notre équipe dynamique de 33 administrateurs, nous
                            savons trouver des solutions sur mesure à vos projets. Certifiée de la
                            norme{' '}
                            <Link
                                className="text-link hover:underline"
                                href="https://telecom-etude.fr/projets"
                            >
                                ISO9001
                            </Link>{' '}
                            et de la meilleure mention de la{' '}
                            <Link
                                className="text-link hover:underline"
                                href="https://junior-entreprises.com"
                            >
                                CNJE
                            </Link>
                            , ingénieurs étudiants de Telecom Paris.
                        </p>
                    </section>
                    <section>
                        <h2 className="p-10 pl-0 text-je-red text-3xl">Pourquoi nous&nbsp;?</h2>
                        <p>
                            <Link
                                className="text-link hover:underline"
                                href="https://telecom-etude.fr"
                            >
                                Telecom Etude
                            </Link>{' '}
                            vous accompagne pour améliorer votre performance et pour développer vos
                            produits. À l&apos;aide de missions personnalisées et encardées par des
                            chefs de projets, nous sommes là pour vous aider à atteindre vos
                            objectifs avec une efficacité exemplaire.
                        </p>
                    </section>
                    <section>
                        <h2 className="p-10 pl-0 text-je-red text-3xl">Notre fonctionnement</h2>
                        <p>
                            Pour avoir plus d&apos;informations sur notre fonctionnement, vous
                            pouvez consulter notre site internet en cliquant{' '}
                            <Link
                                className="text-link hover:underline"
                                href="https://telecom-etude.fr"
                            >
                                ici
                            </Link>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
