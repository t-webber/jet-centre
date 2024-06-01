'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { MissionNavbar } from './navbar-mission';

const Switcher = ({
    isCDP,
    setIsCDP,
    position,
}: {
    isCDP: boolean;
    setIsCDP: (newValue: boolean) => void;
    position: string;
}) => (
    <div className="flex justify-between">
        <Button
            variant={isCDP ? 'secondary' : 'outline'}
            onClick={() => setIsCDP(true)}
            className={isCDP ? 'active' : ''}
            disabled={isCDP}
        >
            CDP
        </Button>
        <Button
            variant={!isCDP ? 'secondary' : 'outline'}
            onClick={() => setIsCDP(false)}
            className={!isCDP ? 'active' : ''}
            disabled={!isCDP}
        >
            {position}
        </Button>
    </div>
);

export const NavbarContent = ({ missions, position }: { missions: string[]; position: string }) => {
    const [isCDP, setIsCDP] = useState(true);
    const [missionNb, setMissionNb] = useState(0);
    return (
        <>
            <Switcher isCDP={isCDP} setIsCDP={setIsCDP} position={position} />
            <Separator />
            {isCDP ? (
                <MissionNavbar
                    missions={missions}
                    missionNb={missionNb}
                    setMissionNb={setMissionNb}
                />
            ) : null}
        </>
    );
};
