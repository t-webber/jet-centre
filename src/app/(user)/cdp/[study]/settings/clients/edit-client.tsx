import { Dispatch, SetStateAction, useState } from 'react';
import { FaEye, FaPencil, FaTrash } from 'react-icons/fa6';

import { IconButton } from '@/components/buttons';
import { LoadingFullStops } from '@/components/loading';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { reloadWindow } from '@/lib/utils';

import { removeClient } from './action';
import { ClientFormType } from './schema';

interface DeleteClientDialogProps {
    isDeleteOpen: boolean;
    setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
    studyClientId: string;
}

function DeleteClientDialog({
    isDeleteOpen,
    setIsDeleteOpen,
    studyClientId,
}: DeleteClientDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AlertDialog open={isDeleteOpen} onOpenChange={() => setIsDeleteOpen((isOpen) => !isOpen)}>
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
                                    setIsDeleteOpen(false);
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
                            onClick={() => setIsDeleteOpen(true)}
                        />
                    </div>
                    <DeleteClientDialog
                        isDeleteOpen={isDeleteOpen}
                        setIsDeleteOpen={setIsDeleteOpen}
                        studyClientId={studyClientId}
                    />
                </>
            )}
        </div>
    );
}
