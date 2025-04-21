'use client';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { AddButton } from '@/components/buttons';

import { ClientFormType, StudyClientsFormType } from './schema';

interface StudyInfosParamsEditorParams extends StudyClientsFormType {
    studyCode: string;
    title: string;
}

function StudyClientEditor({}: { client: ClientFormType }) {
    return <></>;
}

export function StudyClientsParamsEditor({ clients, title }: StudyInfosParamsEditorParams) {
    return (
        <Box>
            <BoxHeader>
                <BoxTitle>{title}</BoxTitle>
            </BoxHeader>
            <BoxContent>
                {clients.map((client, i) => (
                    <StudyClientEditor client={client} key={i} />
                ))}
                <AddButton text="Ajouter un client" onClick={() => {}} />
            </BoxContent>
        </Box>
    );
}
