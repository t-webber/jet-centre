'use client';

import { useState } from 'react';

import { IconType } from 'react-icons/lib';
import { MdOpenInNew } from 'react-icons/md';
import { RiExpandUpDownFill, RiContractUpDownFill } from 'react-icons/ri';
import { FaFilePdf, FaGripLines } from 'react-icons/fa';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import { BoxCollapser } from '@/components/boxes/boxes';
import { Button } from '@/components/ui/button';

import { Assignee } from './page';
import { Right } from './clientsAssignees';

const eltCN = 'bg-background border-2 border-muted p-2';

export type ClientProps = {
    assignee: Assignee;
    setCurrent: (assignee: Assignee) => void;
    setRight: (right: Right) => void;
    current: Assignee;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export default function Client({
    assignee,
    setCurrent,
    setRight,
    current,
    dragHandleProps,
}: ClientProps) {
    const [collapse, setCollapse] = useState(true);

    return (
        <div className="h-full">
            <div
                className="bg-box-title p-2 flex justify-between items-center rounded"
                {...dragHandleProps}
            >
                <p>{assignee.firstname + ' ' + assignee.lastname}</p>
                <div className="flex items-center">
                    <Button
                        onClick={() => {
                            setCurrent(assignee);
                            setRight(assignee.interview ? 'see_interview' : 'pass_interview');
                        }}
                        variant="secondary"
                        className="flex items-center space-x-2"
                    >
                        <p>Entretien</p>
                        <MdOpenInNew />
                    </Button>
                    <AssigneeButton
                        onClick={() => {
                            if (collapse) {
                                setCurrent(assignee);
                            }
                            setCollapse(!collapse);
                        }}
                        Icon={collapse ? RiExpandUpDownFill : RiContractUpDownFill}
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
            <BoxCollapser collapse={collapse}>
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
            </BoxCollapser>
        </div>
    );
}

function AssigneeButton({ onClick, Icon }: { onClick: () => void; Icon: IconType }) {
    return (
        <Button variant="ghost" className="m-0 p-2" onClick={onClick}>
            <Icon />
        </Button>
    );
}
