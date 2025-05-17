'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose, DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaPencil, FaTrash } from 'react-icons/fa6';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { AddButton, IconButton } from '@/components/buttons';
import { InputFormElement } from '@/components/meta-components/form/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormProvider } from '@/components/ui/form';

import { addClient, removeClient } from './action';
import { clientFormSchema, ClientFormType, StudyClientsFormType } from './schema';

interface StudyInfosParamsEditorParams extends StudyClientsFormType {
    studyCode: string;
    title: string;
}

function ClientEditor({ client }: { client: ClientFormType }) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const studyClientId: string | undefined = client.studyClientId;

    return (
        <div className="flex justify-between items-center border rounded-md pl-2 border-input">
            {studyClientId === undefined ? (
                <p>Failed to load client</p>
            ) : (
                <>
                    <p>{client.firstName + ' ' + client.lastName}</p>
                    <div>
                        <IconButton
                            hoverContent="See client information"
                            Icon={FaEye}
                            onClick={() => {}}
                        />
                        <IconButton
                            hoverContent="Update client infromation"
                            onClick={() => {}}
                            Icon={FaPencil}
                        />
                        <IconButton
                            hoverContent="Remove client from study"
                            Icon={FaTrash}
                            onClick={() => {}}
                        />
                    </div>
                    <Dialog
                        open={isDeleteOpen}
                        onOpenChange={() => setIsDeleteOpen((isOpen) => !isOpen)}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirmer la suppression du client</DialogTitle>
                                <DialogDescription>
                                    Ce client sera enlevé de cette étude. Il existera toujours dans
                                    la base si vous désirez l'ajouter plus tard. Changer le client
                                    risque de corrompre certaines données si l'étude est trop
                                    avancée.
                                </DialogDescription>
                                <DialogClose onClick={() => removeClient(studyClientId)}>
                                    Confirmer la suppression
                                </DialogClose>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </div>
    );
}

function ClientAdder({ onSubmit }: { onSubmit: (values: ClientFormType) => void }) {
    const form = useForm<ClientFormType>({
        resolver: zodResolver(clientFormSchema),
    });

    return (
        <>
            <FormProvider {...form}>
                <form
                    className="space-y-main py-main"
                    action={() => console.log('hahahah')}
                    onSubmit={() => console.log('héhéhéh')}
                >
                    <InputFormElement
                        className="mb-0"
                        form={form}
                        label="Nom de l'emploi"
                        name="job"
                    />
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
                </form>
            </FormProvider>
            <Button
                type="button"
                className="w-full"
                onClick={(e) => {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)();
                }}
            >
                Valider
            </Button>
        </>
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
                                console.log('REMYYYYYYYYYYYYYYY');
                                addClient(studyId, client).then(() => {
                                    setClientAddOpen(false);
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
