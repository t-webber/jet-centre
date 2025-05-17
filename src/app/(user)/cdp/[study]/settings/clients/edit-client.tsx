import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaEye, FaPencil, FaTrash } from 'react-icons/fa6';

import { IconButton } from '@/components/buttons';
import { LoadingFullStops } from '@/components/loading';
import { InputFormElement } from '@/components/meta-components/form/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { personName, reloadWindow } from '@/lib/utils';

import { removeClient, updateClient } from './action';
import { clientFormSchema, ClientFormType } from './schema';

interface EditClientDialogProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    client: ClientFormType;
}

function EditClientDialog({ isOpen, setIsOpen, client }: EditClientDialogProps) {
    const clientId = client.clientId;
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edition de {personName(client)}</AlertDialogTitle>
                </AlertDialogHeader>
                {clientId === undefined ? (
                    <p>Erreur lors du chargement du client</p>
                ) : (
                    <EditClientForm
                        client={client}
                        onSubmit={(newClientData) => {
                            setIsLoading(true);
                            updateClient(clientId, newClientData).then(() => reloadWindow());
                        }}
                        isLoading={isLoading}
                    />
                )}
                <AlertDialogFooter>
                    <AlertDialogCancel className="w-full">Annuler</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

interface EditClientFormProps {
    client: ClientFormType;
    onSubmit: (values: ClientFormType) => void;
    isLoading: boolean;
}

function EditClientForm({ onSubmit, client, isLoading }: EditClientFormProps) {
    const form = useForm<ClientFormType>({
        resolver: zodResolver(clientFormSchema),
        defaultValues: client,
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
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <LoadingFullStops />
                </div>
            ) : (
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
            )}
        </>
    );
}

interface ViewClientDialogProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    client: ClientFormType;
}

function ViewClientDialog({ isOpen, setIsOpen, client }: ViewClientDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen((isOpen) => !isOpen)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{personName(client)}</DialogTitle>
                    <DialogDescription>
                        <div className="grid grid-cols-2">
                            <p>Métier</p>
                            <p>{client.job}</p>
                            <p>Email</p>
                            <p>{client.email || 'Inconnu'}</p>
                            <p>Numéro de téléphone</p>
                            <p>{client.number || 'Inconnu'}</p>
                            <p>Addresse</p>
                            <p>
                                {client.address === undefined
                                    ? 'Inconnue'
                                    : `${client.address.number} ${client.address.street}, ${client.address.zipCode}, ${client.address.city}, ${client.address.country}`}
                                ,
                            </p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

interface DeleteClientDialogProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    studyClientId: string;
}

function DeleteClientDialog({ isOpen, setIsOpen, studyClientId }: DeleteClientDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AlertDialog open={isOpen} onOpenChange={() => setIsOpen((isOpen) => !isOpen)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer la suppression du client</AlertDialogTitle>
                    <AlertDialogDescription>
                        Ce client sera enlevé de cette étude. Il existera toujours dans la base si
                        vous désirez l'ajouter plus tard. Changer le client risque de corrompre
                        certaines données si l'étude est trop avancée.
                    </AlertDialogDescription>
                    {isLoading ? (
                        <div className="w-full items-center flex justify-center">
                            <LoadingFullStops />
                        </div>
                    ) : (
                        <div className="w-full items-center flex justify-between pt-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                Annuler la suppression
                            </Button>
                            <Button
                                variant="default"
                                onClick={() => {
                                    setIsLoading(true);
                                    removeClient(studyClientId).then(() => reloadWindow());
                                }}
                            >
                                Confirmer la suppression
                            </Button>
                        </div>
                    )}
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function ClientEditor({ client }: { client: ClientFormType }) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const studyClientId: string | undefined = client.studyClientId;

    return (
        <div className="flex justify-between items-center border rounded-md pl-2 border-input">
            {studyClientId === undefined ? (
                <p>Failed to load client</p>
            ) : (
                <>
                    <p>{personName(client)}</p>
                    <div>
                        <IconButton
                            hoverContent="See client information"
                            Icon={FaEye}
                            onClick={() => setIsViewOpen(true)}
                        />
                        <IconButton
                            hoverContent="Update client infromation"
                            onClick={() => setIsEditorOpen(true)}
                            Icon={FaPencil}
                        />
                        <IconButton
                            hoverContent="Remove client from study"
                            Icon={FaTrash}
                            onClick={() => setIsDeleteOpen(true)}
                        />
                    </div>
                    <DeleteClientDialog
                        isOpen={isDeleteOpen}
                        setIsOpen={setIsDeleteOpen}
                        studyClientId={studyClientId}
                    />
                    <EditClientDialog
                        isOpen={isEditorOpen}
                        setIsOpen={setIsEditorOpen}
                        client={client}
                    />
                    <ViewClientDialog
                        isOpen={isViewOpen}
                        setIsOpen={setIsViewOpen}
                        client={client}
                    />
                </>
            )}
        </div>
    );
}
