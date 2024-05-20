import { PointerEventHandler, useState } from 'react';
import { Button } from './button';
import LogoBird from './logo';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const Logo = () => {
    return (
        <div className="flex flex-row space-x-2 justify-center">
            <LogoBird />
            <div className="text-base">
                <p>TELECOM</p>
                <p>ETUDE</p>
            </div>
        </div>
    );
};

const NavBar = () => {
    return (
        <div className="relative overflow-hidden p-main bg-[#11121b] h-full">
            <Logo />
        </div>
    );
};

export default NavBar;
