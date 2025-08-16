'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { subscribePerson } from './actions';
import { MriSubscriptionForm } from './form';
import { MriSubscriptionType } from './schema';
import { FoundPerson, SubscribePersonReturn, SubscribePersonStatus } from './types';

export function Inner() {
    const [serverData, setServerData] = useState<SubscribePersonReturn | undefined>();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<undefined | MriSubscriptionType>();

    const updateServer = (
        values: MriSubscriptionType,
        person?: FoundPerson,
        changeEmail?: string
    ) => {
        setFormValues(values);
        setLoading(true);
        setServerData(undefined);
        subscribePerson(
            values,
            person?.id,
            person?.assignee?.id,
            changeEmail,
            !!person?.assignee?.mriSubscriber
        ).then((data) => {
            setServerData(data);
            setLoading(false);
        });
    };

    const getDataUnchecked = () => {
        if (serverData?.status === SubscribePersonStatus.WrongEmail && formValues !== undefined)
            return { server: serverData, client: formValues };
    };

    return (
        <>
            <AlertDialog open={serverData?.status === SubscribePersonStatus.WrongEmail}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Vous avez déjà renseigné une adresse</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex flex-col space-y-main">
                        <AlertDialogAction
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                                const data = getDataUnchecked();
                                if (!data || !data.server.person.email) return;
                                updateServer(
                                    { ...data.client, email: data.server.person.email },
                                    data.server.person
                                );
                            }}
                        >
                            Continuer avec {getDataUnchecked()?.server.person.email}
                        </AlertDialogAction>
                        <AlertDialogAction
                            variant="outline"
                            onClick={() => {
                                const data = getDataUnchecked();
                                if (!data) return;
                                updateServer(data.client, data.server.person, data.client.email);
                            }}
                        >
                            Continuer avec {getDataUnchecked()?.client.email}
                        </AlertDialogAction>
                        <AlertDialogAction asChild variant="outline">
                            <Link href="mailto:info@telecom-etude.fr">
                                L&apos;autre adresse proposée n&apos;est pas la mienne. Contacter la
                                DSI.
                            </Link>
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
            {serverData?.status === SubscribePersonStatus.Ok ? (
                <div className="flex flex-col space-y-main">
                    <p className="text-center">
                        Merci de vous être abonné à cette liste de diffusion!
                    </p>
                    <Link href="/mri/unsubscribe" className="underline text-primary text-center">
                        Cliquez ici pour vous désinscrire
                    </Link>
                </div>
            ) : !loading && serverData && serverData.status !== SubscribePersonStatus.WrongEmail ? (
                <div className="flex flex-col space-y-main">
                    <p className="text-destructive text-center">
                        Une erreur inattendue s&apos;est produite.
                        <br />
                        Merci de reporter le code suivant en faisant un ticket SOS:{' '}
                        {serverData.status}
                    </p>
                    <Link
                        href="mailto:info@telecom-etude.fr"
                        className="underline text-primary text-center"
                    >
                        Ticket SOS
                    </Link>
                </div>
            ) : (
                <>
                    <MriSubscriptionForm
                        subscribePerson={updateServer}
                        disabled={loading || serverData !== undefined}
                    />
                    <div className="flex items-center space-x-2 w-full">
                        <Separator className="bg-primary flex-1" />
                        <p className="text-primary">ou</p>
                        <Separator className="bg-primary flex-1" />
                    </div>
                    <Button variant="outline" asChild className="m-auto">
                        <Link href="/404">S&apos;inscrire avec le SSO de Télécom Paris</Link>
                    </Button>
                </>
            )}
        </>
    );
}
