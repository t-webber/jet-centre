import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { NavigationTemplate } from './menu-template';

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
                href: 'dashboard',
                name: 'Tableau de bord',
            },
        ],
        [
            {
                href: 'notes',
                name: 'Notes clients & étude',
            },
            {
                href: 'mri',
                name: 'Écriture MRI',
            },
            {
                href: 'assignees',
                name: "Sélection d'intervenants",
            },
            {
                href: 'docs',
                name: 'Documents',
            },
        ],
        [
            {
                href: 'suivi',
                name: "Suivi de l'étude",
            },
            {
                href: 'finalisation',
                name: "Finalisation de l'étude",
            },
        ],
        [
            {
                href: 'treso',
                name: 'Espace trésorerie',
            },
        ],
    ];

    return (
        <>
            <div className="flex-1">
                <NavigationTemplate links={links} />
            </div>
            <div className="flex flex-col items-center space-y-4">
                <div>{mission}</div>
                <Separator />
                <div className="flex space-x-2">
                    {missions.map((m, i) => (
                        <Button
                            variant={missionNb === i ? 'secondary' : 'outline'}
                            className="rounded-full aspect-square w-8 h-8 p-0"
                            key={i}
                            onClick={() => setMissionNb(i)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
