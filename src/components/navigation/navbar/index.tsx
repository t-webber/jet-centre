'use client';

import { NavbarHeader } from './header';
import { UserDropdownMenu } from '../user-dropdown-menu';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MissionNavbar } from './tab-mission';
import { SuiviNavbar } from './tab-suivi';

const NavBar = () => {
    const [missionNb, setMissionNb] = useState(0);
    const missions = ['223072', '223073', '223074'];

    const tabs = [
        {
            label: 'CDP',
            value: 'cdp',
            content: (
                <MissionNavbar
                    missions={missions}
                    missionNb={missionNb}
                    setMissionNb={setMissionNb}
                />
            )
        },
        {
            label: 'Respo Suivi',
            value: 'position',
            content: (
                <SuiviNavbar
                    missions={missions}
                    missionNb={missionNb}
                    setMissionNb={setMissionNb}
                />
            )
        }
    ];

    return (
        <div className="h-screen flex flex-col gap-6 p-4">
            <NavbarHeader />
            <div className="flex-grow flex flex-col gap-2">
                <Tabs defaultValue="cdp" className="w-full h-full flex flex-col">
                    <TabsList className="flex bg-transparent">
                        {tabs.map((tab, i) => (
                            <TabsTrigger
                                key={i}
                                className="mx-2 flex-1 rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-primary"
                                value={tab.value}
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {tabs.map((tab, i) => (
                        <TabsContent key={i} value={tab.value} className="flex-grow py-2">
                            {tab.content}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
            <UserDropdownMenu username="Nicolas Glady" />
        </div>
    );
};

export default NavBar;
