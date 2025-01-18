'use client';

import { get_user_missions } from '@/actions/cdp';
import { User } from '@prisma/client';
import { useState } from 'react';
import { NavigationTemplate } from '../menu-template';
import { StudySelection } from './sidebar-study-selection';
import { useSession } from 'next-auth/react';
import { FaGears, FaHouse, FaNoteSticky } from 'react-icons/fa6';
import { SideBarGroups } from '@/settings/sidebars/siderbar-trez';

export default function SidebarCdp() {
    const session = useSession();
    const user = session.data?.user;
    const missions = get_user_missions(user);
    const mission = missions[0];
    const [selectedMission, setSelectedMission] = useState(0);

    const sidebar_groups: SideBarGroups[] = [
        {
            title: 'Défaut',
            items: [
                {
                    title: 'Tableau de bord',
                    icon: FaHouse,
                    href: '/' + mission + '/dashboard'
                },
                {
                    title: "Paramètres de l'étude",
                    icon: FaGears,
                    href: '/' + mission + '/params'
                }
            ]
        },
        {
            title: 'Pré-étude',
            items: [
                {
                    title: 'Notes clients & étude',
                    icon: FaNoteSticky,
                    href: '/' + mission + '/notes'
                },
                {
                    title: 'Écriture MRI',
                    icon: FaNoteSticky,
                    href: '/' + mission + '/mri'
                },
                {
                    title: "Sélection d'intervenants",
                    icon: FaNoteSticky,
                    href: '/' + mission + '/assignees'
                },
                {
                    title: 'Documents',
                    icon: FaNoteSticky,
                    href: '/' + mission + '/docs'
                }
            ]
        },
        {
            title: 'Suivi',
            items: [
                {
                    title: "Suivi de l'étude",
                    icon: FaNoteSticky,
                    href: '/' + mission + '/suivi'
                },
                {
                    title: "Finalisation de l'étude",
                    icon: FaNoteSticky,
                    href: '/' + mission + '/finalisation'
                }
            ]
        },
        {
            title: 'Espace fun',
            items: [
                {
                    title: 'Espace trésorerie',
                    icon: FaNoteSticky,
                    href: '/' + mission + '/treso'
                }
            ]
        }
    ];

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="flex-grow">
                <NavigationTemplate sidebar_groups={sidebar_groups} />
            </div>
            <div className="flex flex-col items-center gap-1">
                <div className="flex flex-col items-center gap-1">
                    {mission}
                    <div className="h-1 w-[calc(100%+1rem)] rounded-full bg-secondary"></div>
                </div>
                {/* Large separator */}
                <StudySelection
                    missions={missions}
                    selectedMission={selectedMission}
                    setSelectedMission={setSelectedMission}
                />
            </div>
        </div>
    );
}
