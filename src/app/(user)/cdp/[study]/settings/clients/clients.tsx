'use client';

import { useState } from 'react';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { AddButton } from '@/components/buttons';

import { DisplayStudyClient } from './display-client';
import { NewStudyClientDialog } from './new-client';
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
                        <DisplayStudyClient client={client} key={i} />
                    ))}
                    <AddButton text="Ajouter un client" onClick={() => setClientAddOpen(true)} />
                </BoxContent>
            </Box>
            <NewStudyClientDialog
                clientAddOpen={clientAddOpen}
                setClientAddOpen={setClientAddOpen}
                studyId={studyId}
            />
        </>
    );
}
