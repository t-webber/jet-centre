'use client';

import { useState } from 'react';

import { SidebarSeparator } from '@/components/ui/sidebar';
import { CDP_SIDEBAR } from '@/settings/sidebars/sidebars';

import { SidebarList } from './sidebar-list';
import { StudySelection } from './sidebar-study-selection';

export default function SidebarCdp({ missions, isOpen }: { missions: string[]; isOpen: boolean }) {
    const [selectedMission, setSelectedMission] = useState(0);
    const missionCode = missions[selectedMission];

    return (
        <div className="h-full flex flex-col justify-between">
            <SidebarList sidebar_groups={CDP_SIDEBAR} missionCode={missionCode} />
            {isOpen ? (
                <div className="flex flex-col items-center gap-1">
                    <div className="flex flex-col items-center gap-1">
                        <div>{missionCode}</div>
                        <SidebarSeparator className="h-1 w-[calc(100%+1rem)] rounded-full bg-secondary" />
                    </div>
                    <StudySelection
                        missions={missions}
                        selectedMission={selectedMission}
                        setSelectedMission={setSelectedMission}
                    />
                </div>
            ) : (
                <p className="-rotate-90 flex flex-col items-center gap-1 p-4">{missionCode}</p>
            )}
        </div>
    );
}
