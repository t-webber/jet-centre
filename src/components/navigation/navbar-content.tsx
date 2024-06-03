'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { MissionNavbar } from './navbar-mission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const NavbarContent = ({ missions, position }: { missions: string[]; position: string }) => {
    const [missionNb, setMissionNb] = useState(0);
    return (
        <Tabs defaultValue="cdp" className="w-full h-full">
            <TabsList className="flex">
                <TabsTrigger className="flex-1" value="cdp">
                    CDP
                </TabsTrigger>
                <TabsTrigger className="flex-1" value="position">
                    {position}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="cdp" className="h-full py-main">
                <MissionNavbar
                    missions={missions}
                    missionNb={missionNb}
                    setMissionNb={setMissionNb}
                />
            </TabsContent>
            <TabsContent value="position" className="h-full py-main">
                Todo.
            </TabsContent>
        </Tabs>
    );
};
