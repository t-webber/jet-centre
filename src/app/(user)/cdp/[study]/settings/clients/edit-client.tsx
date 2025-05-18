import { zodResolver } from '@hookform/resolvers/zod';
import { CompanySize } from '@prisma/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaEye, FaPencil, FaTrash } from 'react-icons/fa6';

import { IconButton } from '@/components/buttons';
import { LoadingFullStops } from '@/components/loading';
import { DropdownManyFormElement } from '@/components/meta-components/form/dropdownMany';
import { DropdownSingleFormElement } from '@/components/meta-components/form/dropdownSingle';
import { InputFormElement } from '@/components/meta-components/form/input';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { COMPANY_SIZE_NAMES, COMPANY_SIZES, DOMAIN_NAMES, DOMAINS } from '@/db/types';
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

function EnableBox({ label, onClick }: { label: string; onClick: (value: boolean) => void }) {
    return (
        <div className="flex items-center gap-x-2">
            <Checkbox onCheckedChange={onClick} />
            <p>{label}</p>
        </div>
    );
}

interface EditClientFormProps {
    client: ClientFormType;
    onSubmit: (values: ClientFormType) => void;
    isLoading: boolean;
}

function EditClientForm({ onSubmit, client, isLoading }: EditClientFormProps) {
    const defaultValues = client;

    if (defaultValues.company === undefined) {
        defaultValues.company = {
            name: '',
            address: undefined,
            size: CompanySize.MicroEntreprise,
            ca: 0,
            domains: [],
        };
    }

    const form = useForm<ClientFormType>({
        resolver: zodResolver(clientFormSchema),
        defaultValues: client,
    });

    const [editCompany, setEditCompany] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const [editCompanyAddress, setEditCompanyAddress] = useState(false);

    return (
        <>
            <FormProvider {...form}>
                <h2>Informations sur le client</h2>
                <form className="space-y-main py-main">
                    <InputFormElement form={form} label="Prénom" name="firstName" />
                    <InputFormElement form={form} label="Nom de famille" name="lastName" />
                    <InputFormElement
                        className="mb-0"
                        form={form}
                        label="Nom de l'emploi"
                        name="job"
                    />
                    <InputFormElement form={form} label="Email" name="email" />
                    <InputFormElement form={form} label="Numéro de téléphone" name="number" />
                    <Separator />
                    <h2>Addresse du client</h2>
                    <EnableBox onClick={setEditAddress} label="Addresse du client" />
                    {editAddress && (
                        <>
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
                        </>
                    )}
                    <Separator />
                    <h2>L'entreprise</h2>
                    <EnableBox onClick={setEditCompany} label="Entreprise du client" />
                    {editCompany && (
                        <>
                            <InputFormElement form={form} label="Nom" name="company.name" />
                            <InputFormElement
                                form={form}
                                label="Chiffre d'Affaire"
                                name="company.ca"
                                type="number"
                            />
                            <DropdownSingleFormElement
                                form={form}
                                label="Taille"
                                name="company.size"
                                values={COMPANY_SIZE_NAMES}
                                displayValue={(size) => (size ? COMPANY_SIZES[size].display : '')}
                            />
                            <DropdownManyFormElement
                                form={form}
                                label="Domaines"
                                name="company.domains"
                                values={DOMAIN_NAMES}
                                displayValue={(domain) => (domain ? DOMAINS[domain].display : '')}
                            />
                            <Separator />
                            <h2>Adresse de 'entreprise</h2>
                            <EnableBox
                                onClick={setEditCompanyAddress}
                                label="Adresse de l'entreprise"
                            />
                            {editCompanyAddress && (
                                <>
                                    <div className="grid-cols-5 grid gap-x-main">
                                        <InputFormElement
                                            form={form}
                                            className="mb-0"
                                            label="N°"
                                            name="company.address.number"
                                        />
                                        <InputFormElement
                                            className="col-span-4 mb-0"
                                            form={form}
                                            label="Rue"
                                            name="company.address.street"
                                        />
                                    </div>
                                    <div className="grid-cols-2 grid gap-x-main">
                                        <InputFormElement
                                            className="mb-0"
                                            form={form}
                                            label="Ville"
                                            name="company.address.city"
                                        />
                                        <InputFormElement
                                            className="mb-0"
                                            form={form}
                                            label="Code postal"
                                            name="company.address.zipCode"
                                        />
                                    </div>
                                    <InputFormElement
                                        form={form}
                                        label="Pays"
                                        name="company.address.country"
                                    />
                                </>
                            )}
                        </>
                    )}
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
                        form.handleSubmit((values) => {
                            if (!editAddress) values.address = undefined;
                            if (!editCompany) values.company = undefined;
                            if (values.company && !editCompanyAddress)
                                values.company.address = undefined;
                            onSubmit(values);
                        })();
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
                    <div className="grid grid-cols-2">
                        <p>Métier</p>
                        <p>{client.job}</p>
                        <p>Email</p>
                        <p>{client.email || 'Inconnu'}</p>
                        <p>Numéro de téléphone</p>
                        <p>{client.number || 'Inconnu'}</p>
                        <p>Adresse</p>
                        <p>
                            {client.address === undefined
                                ? 'Inconnue'
                                : `${client.address.number} ${client.address.street}, ${client.address.zipCode}, ${client.address.city}, ${client.address.country}`}
                            ,
                        </p>
                    </div>
                    {client.company === undefined ? (
                        <p>Entreprise non spécifiée</p>
                    ) : (
                        <>
                            <Separator />
                            <h2>Son entreprise</h2>
                            <div className="grid grid-cols-2">
                                <p>Nom</p>
                                <p>{client.company.name}</p>
                                <p>Taille</p>
                                <p>
                                    {client.company.size === undefined
                                        ? 'Inconnu'
                                        : COMPANY_SIZES[client.company.size].display}
                                </p>
                                <p>CA</p>
                                <p>{client.company.ca || 'Inconnu'}</p>
                                <p>Domaines</p>
                                <div>
                                    {client.company.domains.map((domain, i) => (
                                        <p key={i}>{DOMAINS[domain].display}</p>
                                    ))}
                                </div>
                                <p>Adresse</p>
                                <p>
                                    {client.company.address === undefined
                                        ? 'Inconnue'
                                        : `${client.company.address.number} ${client.company.address.street}, ${client.company.address.zipCode}, ${client.company.address.city}, ${client.company.address.country}`}
                                    ,
                                </p>
                            </div>
                        </>
                    )}
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
