import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaEye, FaPencil, FaTrash } from 'react-icons/fa6';

import { IconButton } from '@/components/buttons';
import { LoadingFullStops } from '@/components/loading';
import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
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
        <Dialog open={isDeleteOpen} onOpenChange={() => setIsDeleteOpen((isOpen) => !isOpen)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmer la suppression du client</DialogTitle>
                    <DialogDescription>
                        Ce client sera enlevé de cette étude. Il existera toujours dans la base si
                        vous désirez l'ajouter plus tard. Changer le client risque de corrompre
                        certaines données si l'étude est trop avancée.
                    </DialogDescription>
                    {isLoading ? (
                        <div className="w-full items-center flex justify-center">
                            <LoadingFullStops />
                        </div>
                    ) : (
                        <Button
                            variant="default"
                            onClick={() => {
                                setIsLoading(true);
                                removeClient(studyClientId).then(() => reloadWindow());
                            }}
                        >
                            Confirmer la suppression
                        </Button>
                    )}
                </DialogHeader>
            </DialogContent>
        </Dialog>
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
