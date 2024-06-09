'use client';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { Assignee } from './page';
import { useState } from 'react';
import { Interview } from './right-components/interview';
import { MRIForm } from './right-components/mri-form';
import { PDF } from './right-components/pdf';

const data = {};

export default function ClientAssignees({ assignees }: { assignees: Assignee[] }) {
    const [right, setRight] = useState<'cv' | 'pass_interview' | 'see_interview' | 'mri_form'>();
    const [current, setCurrent] = useState<number>(0);
    const assignee = assignees[current];
    var currentTitle;
    switch (right) {
        case 'mri_form':
            currentTitle = 'Formulaire MRI';
            break;
        case 'pass_interview':
            currentTitle = "Effectuer l'entretien";
            break;
        case 'see_interview':
            currentTitle = "Réponse à l'entretien";
            break;
        default:
            currentTitle = 'CV';
            break;
    }
    currentTitle += ` - ${assignee.firstname} ${assignee.lastname}`;
    return (
        <div className="flex space-x-main">
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>Retour des candidatures</BoxTitle>
                </BoxHeader>
                <BoxContent>{/* <Dragable /> */}todo.</BoxContent>
            </Box>
            <Box>
                <BoxHeader>
                    <BoxTitle>{currentTitle}</BoxTitle>
                </BoxHeader>
                <BoxContent>
                    {right === 'cv' && <PDF />}
                    {right === 'pass_interview' && <Interview editable />}
                    {right === 'see_interview' && <Interview />}
                    {right === 'mri_form' && <MRIForm />}
                </BoxContent>
            </Box>
        </div>
    );
}
