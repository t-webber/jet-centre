'use client';

import { useState } from 'react';
import { FaFilePdf, FaGripLines } from 'react-icons/fa';
import { RiExpandUpDownFill } from 'react-icons/ri';
import { MdOpenInNew } from 'react-icons/md';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import SortableList from '@/components/animations/drag';
import { Button } from '@/components/ui/button';

import { Assignee } from './page';
import { Interview } from './right-components/interview';
import { PDF } from './right-components/pdf';
import { IconType } from 'react-icons/lib';

function getCurrentTitle(right: Right, current: Assignee) {
    var currentTitle;
    switch (right) {
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
    currentTitle += ` - ${current?.firstname} ${current?.lastname}`;
    return currentTitle;
}

type Right = 'cv' | 'pass_interview' | 'see_interview';

function AssigneeButton({ onClick, Icon }: { onClick: () => void; Icon: IconType }) {
    return (
        <Button variant="ghost" className="m-0 p-2" onClick={onClick}>
            <Icon />
        </Button>
    );
}

const eltCN = 'bg-background border-2 border-muted p-2';

export default function ClientAssignees({ assignees }: { assignees: [Assignee, ...Assignee[]] }) {
    const [right, setRight] = useState<Right>('cv');
    const [current, setCurrent] = useState<Assignee>(assignees[0]);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex space-x-main w-full h-full">
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>Retour des candidatures</BoxTitle>
                </BoxHeader>
                <BoxContent fill>
                    <SortableList
                        initialItems={assignees}
                        colors={{}}
                        className="h-full"
                        getKey={(assignee) => assignee.email}
                        render={(assignee) => (
                            <div className="p-2 h-full">
                                <div className="bg-box-title p-2 flex justify-between items-center rounded">
                                    <p>{assignee.firstname + ' ' + assignee.lastname}</p>
                                    <div className="flex items-center">
                                        <Button
                                            onClick={() => {
                                                setCurrent(assignee);
                                                setRight(
                                                    assignee.interview
                                                        ? 'see_interview'
                                                        : 'pass_interview',
                                                );
                                            }}
                                            variant="secondary"
                                            className="flex items-center space-x-2"
                                        >
                                            <p>Entretien</p>
                                            <MdOpenInNew />
                                        </Button>
                                        <AssigneeButton
                                            onClick={() => {
                                                if (current === assignee && isOpen) {
                                                    setIsOpen(false);
                                                } else {
                                                    setCurrent(assignee);
                                                    setIsOpen(true);
                                                }
                                            }}
                                            Icon={RiExpandUpDownFill}
                                        />
                                        <AssigneeButton
                                            onClick={() => {
                                                setCurrent(assignee);
                                                setRight('cv');
                                            }}
                                            Icon={FaFilePdf}
                                        />
                                        <FaGripLines />
                                    </div>
                                </div>
                                {isOpen && current === assignee && (
                                    <div className="bg-background grid grid-cols-[20%_80%] rounded p-4  gap-2px">
                                        <div className={eltCN}>Email</div>
                                        <div className={eltCN}>{assignee.email}</div>
                                        <div className={eltCN}>Expérience</div>
                                        <div className={eltCN}>{assignee.experience}</div>
                                        <div className={eltCN}>Connaissances</div>
                                        <div className={eltCN}>{assignee.knowledge}</div>
                                        <div className={eltCN}>Idées</div>
                                        <div className={eltCN}>{assignee.ideas}</div>
                                        <div className={eltCN}>Expérience JE</div>
                                        <div className={eltCN}>{assignee.je_experience}</div>
                                    </div>
                                )}
                            </div>
                        )}
                    />
                </BoxContent>
            </Box>
            <Box className="w-full h-full">
                <BoxHeader>
                    <BoxTitle>{getCurrentTitle(right, current)}</BoxTitle>
                </BoxHeader>
                <BoxContent fill>
                    {right === 'cv' && <PDF />}
                    {right === 'pass_interview' && <Interview editable />}
                    {right === 'see_interview' && <Interview />}
                </BoxContent>
            </Box>
        </div>
    );
}
