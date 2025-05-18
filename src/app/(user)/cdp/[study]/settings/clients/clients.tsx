'use client';

import { useState } from 'react';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { AddButton } from '@/components/buttons';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { reloadWindow } from '@/lib/utils';

import { addClient } from './action';
import { ClientEditor } from './edit-client';
import { ClientAdder } from './new-client';
import { StudyClientsFormType } from './schema';

interface StudyInfosParamsEditorParams extends StudyClientsFormType {
    studyCode: string;
    title: string;
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
                            onSubmit={(client) =>
                                addClient(studyId, client).then(() => reloadWindow())
                            }
                        />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
