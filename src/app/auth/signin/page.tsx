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
                    <h1 className="text-4xl dark: text-primary">Telecom Etude</h1>
                    <p className="text-center">
                        Notre expertise à votre service afin de vous accompagner dans votre
                        transition <strong className="text-primary font-normal">numérique</strong>.
                    </p>
                    <Button asChild>
                        <Link
                            className="flex items-center space-x-2"
                            href="https://telecom-etude.fr"
                        >
                            <p className="text-justify">En savoir plus</p>
                            <FaArrowRight />
                        </Link>
                    </Button>
                    <p className="text-center">
                        Vous êtes (futur) administrateur de Telecom Etude&nbsp;? Accéder à
                        l&apos;outil de gestion en cliquant ci-dessous.
                    </p>
                    <form
                        action={async () => {
                            'use server';
                            await signIn(googleId);
                        }}
                        className="w-full flex justify-center"
                    >
                        <Button type="submit" className="py-10" variant="outline">
                            <div className="flex space-x-6 items-center justify-around sm:w-full flex-col sm:flex-row">
                                <Image
                                    src="/google.svg"
                                    alt="Google Logo"
                                    width={24}
                                    height={24}
                                    className="bg-white rounded-full h-12 w-12 p-2 m-2 border-white"
                                />
                                <span>Sign in with google</span>
                            </div>
                        </Button>
                    </form>
                    <p className="text-center">Une erreur est survenue ? Une question ?</p>
                    <Button asChild variant="secondary">
                        <Link className=" p-2 px-4" href="mailto:jet.info@telecom-etude.fr">
                            Contactez-nous !
                        </Link>
                    </Button>
                </div>
                <div className="flex-1 max-w-[504px] 2xl:max-w-[720px] hidden lg:block">
                    <section>
                        <h2 className="p-10 pl-0 dark: text-primary text-3xl">
                            Qui sommes nous&nbsp;?
                        </h2>
                        <p className="text-justify">
                            Fondée en 1979,{' '}
                            <Link
                                className=" font-semibold text-link hover:underline"
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
                                className=" font-semibold text-link hover:underline"
                                href="https://telecom-etude.fr/projets"
                            >
                                {' '}
                                ISO9001
                            </Link>{' '}
                            et de la meilleure mention de la{' '}
                            <Link
                                className=" font-semibold text-link hover:underline"
                                href="https://junior-entreprises.com"
                            >
                                CNJE
                            </Link>
                            , ingénieurs étudiants de Telecom Paris.
                        </p>
                    </section>
                    <section>
                        <h2 className="p-10 pl-0 dark: text-primary text-3xl">
                            Pourquoi nous&nbsp;?
                        </h2>
                        <p className="text-justify">
                            <Link
                                className=" font-semibold text-link hover:underline"
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
                        <h2 className="p-10 pl-0 dark: text-primary text-3xl">
                            Notre fonctionnement
                        </h2>
                        <p className="text-justify">
                            Pour avoir plus d&apos;informations sur notre fonctionnement, vous
                            pouvez consulter notre site internet en cliquant{' '}
                            <Link
                                className=" font-semibold text-link hover:underline"
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
