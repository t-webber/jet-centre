'use client';

import { User } from '@prisma/client';
import { FaMoneyBill, FaUserPen } from 'react-icons/fa6';
import SidebarCdp from './sidebar-cdp';
import SidebarRole from './sidebar-role';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSession } from 'next-auth/react';

export function SidebarSwitch({ isOpen }: { isOpen: boolean }) {
    const tabs = [
        {
            label: 'CDP',
            value: 'cdp',
            icon: <FaUserPen />,
            content: <SidebarCdp />
        },
        {
            label: 'Trésorier',
            value: 'role',
            icon: <FaMoneyBill />,
            content: <SidebarRole />
        }
    ];

    const [tab, setTab] = useState(0);
    const nextTabIndex = (tab + 1) % tabs.length;

    const onTabChange = (value: string) => {
        setTab(parseInt(value));
    };

    console.log('chosen index', tab);

    return (
        <Tabs
            value={tab.toString()}
            onValueChange={onTabChange}
            className="w-full h-full flex flex-col overflow-x-hidden"
        >
            <TabsList className="flex bg-transparent">
                {isOpen &&
                    tabs.map((tab, i) => {
                        console.log('index', i);

                        return (
                            <TabsTrigger
                                key={i}
                                className="mx-2 flex-1 rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-primary"
                                value={i.toString()}
                            >
                                {tab.label}
                            </TabsTrigger>
                        );
                    })}
                {!isOpen && (
                    <TabsTrigger
                        key={tab}
                        className="mx-2 flex-1 rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-primary"
                        value={nextTabIndex.toString()}
                    >
                        {tabs[tab].icon}
                    </TabsTrigger>
                )}
            </TabsList>
            {tabs.map((tab, i) => (
                <TabsContent
                    key={i}
                    value={i.toString()}
                    className="flex-grow py-2 animate-fade-left"
                >
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}
