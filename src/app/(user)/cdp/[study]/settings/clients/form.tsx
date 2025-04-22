'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { AddButton } from '@/components/buttons';
import { InputFormElement } from '@/components/meta-components/form/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormProvider } from '@/components/ui/form';

import { addClient } from './action';
import { clientFormSchema, ClientFormType, StudyClientsFormType } from './schema';

interface StudyInfosParamsEditorParams extends StudyClientsFormType {
    studyCode: string;
    title: string;
}

function ClientEditor({}: { client: ClientFormType }) {
    return <></>;
}

function ClientAdder({ onSubmit }: { onSubmit: (values: ClientFormType) => void }) {
    const form = useForm<ClientFormType>({
        resolver: zodResolver(clientFormSchema),
    });

    return (
        <FormProvider {...form}>
            <form className="space-y-main py-main" onSubmit={() => form.handleSubmit(onSubmit)}>
                <InputFormElement className="mb-0" form={form} label="Nom de l'emploi" name="job" />
                <InputFormElement form={form} label="Prénom" name="firstName" />
                <InputFormElement form={form} label="Nom de famille" name="lastName" />
                <InputFormElement form={form} label="Numéro de téléphone" name="number" />
                <div className="grid-cols-5 grid gap-x-main">
                    <InputFormElement
                        form={form}
                        className="mb-0"
                        label="N°"
                        name="address.number"
                    />
                    <InputFormElement
                        className="col-span-4 mb-0"
                        form={form}
                        label="Rue"
                        name="address.street"
                    />
                </div>
                <div className="grid-cols-2 grid gap-x-main">
                    <InputFormElement
                        className="mb-0"
                        form={form}
                        label="Ville"
                        name="address.city"
                    />
                    <InputFormElement
                        className="mb-0"
                        form={form}
                        label="Code postal"
                        name="address.zipCode"
                    />
                </div>
                <InputFormElement form={form} label="Pays" name="address.country" />
                <Button className="w-full" type="submit">
                    Valider
                </Button>
            </form>
        </FormProvider>
    );
}

export function StudyClientsParamsEditor({
    clients,
    title,
    studyId,
}: StudyInfosParamsEditorParams) {
    const [clientAddOpen, setClientAddOpen] = useState(false);

    return (
        <>
            <Box>
                <BoxHeader>
                    <BoxTitle>{title}</BoxTitle>
                </BoxHeader>
                <BoxContent>
                    {clients.map((client, i) => (
                        <ClientEditor client={client} key={i} />
                    ))}
                    <AddButton text="Ajouter un client" onClick={() => setClientAddOpen(true)} />
                </BoxContent>
            </Box>
            <Dialog open={clientAddOpen} onOpenChange={() => setClientAddOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouveau client</DialogTitle>
                        <ClientAdder
                            onSubmit={(client) => {
                                addClient(studyId, client).then(() => {
                                    // setClientAddOpen(false);
                                    // reloadWindow();
                                });
                            }}
                        />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
