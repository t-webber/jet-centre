'use client';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { Assignee } from './page';
import { useState } from 'react';
import { Interview } from './right-components/interview';
import { MRIForm } from './right-components/mri-form';
import { PDF } from './right-components/pdf';
import { SortableList } from '@/components/animations/sortable';
import { FaFilePdf, FaGripLines } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

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
        <div className="flex space-x-main w-full">
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>Retour des candidatures</BoxTitle>
                </BoxHeader>
                <BoxContent>
                    <SortableList
                        data={assignees.map((assignee, i) => (
                            <div
                                className="bg-box-title p-2 my-4 flex justify-between items-center rounded"
                                key={i}
                            >
                                <p>{assignee.firstname + ' ' + assignee.lastname}</p>
                                <div className="flex items-center">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setCurrent(i)}
                                        className="m-0 p-2"
                                    >
                                        <div
                                            className={`border-transparent
                                            border-${current === i ? 'b' : 't'}-[10px] border-${current === i ? 'b' : 't'}-foreground
                                            border-r-[7px] border-l-[7px] 
                                    `}
                                        />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="m-0 p-2"
                                        onClick={() => setCurrent(i)}
                                    >
                                        <FaFilePdf />
                                    </Button>

                                    <FaGripLines className="cursor-grab" />
                                </div>
                            </div>
                        ))}
                    />
                </BoxContent>
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
