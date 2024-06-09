import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { NavigationTemplate } from './menu-template';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export const MissionNavbar = ({
    missionNb,
    missions,
    setMissionNb,
}: {
    missionNb: number;
    missions: string[];
    setMissionNb: (missionNb: number) => void;
}) => {
    const mission = missions[missionNb];

    const links = [
        [
            {
                href: mission + '/dashboard',
                name: 'Tableau de bord',
            },
        ],
        [
            {
                href: mission + '/notes',
                name: 'Notes clients & étude',
            },
            {
                href: mission + '/mri',
                name: 'Écriture MRI',
            },
            {
                href: mission + '/assignees',
                name: "Sélection d'intervenants",
            },
            {
                href: mission + '/docs',
                name: 'Documents',
            },
        ],
        [
            {
                href: mission + '/suivi',
                name: "Suivi de l'étude",
            },
            {
                href: mission + '/finalisation',
                name: "Finalisation de l'étude",
            },
        ],
        [
            {
                href: mission + '/treso',
                name: 'Espace trésorerie',
            },
        ],
    ];

    return (
        <div className="h-full flex flex-col flex-1">
            <div className="flex-1">
                <NavigationTemplate links={links} />
            </div>
            <div className="flex flex-col items-center space-y-4 py-4">
                <div>{mission}</div>
                <Separator />
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    setMissionNb(
                                        (missionNb - 1 + missions.length) % missions.length,
                                    )
                                }
                            ></PaginationPrevious>
                        </PaginationItem>
                        {missions.map((m, i) => (
                            <PaginationItem key={i}>
                                <Button
                                    className="rounded-full aspect-square w-6 h-6 p-0"
                                    variant={missionNb === i ? 'secondary' : 'outline'}
                                    onClick={() => setMissionNb(i)}
                                />
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setMissionNb((missionNb + 1) % missions.length)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};
