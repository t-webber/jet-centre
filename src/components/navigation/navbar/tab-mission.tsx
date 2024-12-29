import { NavigationTemplate } from '../menu-template';

import { StudySelection } from './studySelection';

export const MissionNavbar = ({
    missionNb,
    missions,
    setMissionNb
}: {
    missionNb: number;
    missions: string[];
    setMissionNb: (missionNb: number) => void;
}) => {
    const mission = missions[missionNb];

    const links = [
        [
            {
                href: '/' + mission + '/dashboard',
                name: 'Tableau de bord'
            },
            {
                href: '/' + mission + '/params',
                name: "Paramètres de l'étude"
            }
        ],
        [
            {
                href: '/' + mission + '/notes',
                name: 'Notes clients & étude'
            },
            {
                href: '/' + mission + '/mri',
                name: 'Écriture MRI'
            },
            {
                href: '/' + mission + '/assignees',
                name: "Sélection d'intervenants"
            },
            {
                href: '/' + mission + '/docs',
                name: 'Documents'
            }
        ],
        [
            {
                href: '/' + mission + '/suivi',
                name: "Suivi de l'étude"
            },
            {
                href: '/' + mission + '/finalisation',
                name: "Finalisation de l'étude"
            }
        ],
        [
            {
                href: '/' + mission + '/treso',
                name: 'Espace trésorerie'
            }
        ]
    ];

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="flex-grow">
                <NavigationTemplate links={links} />
            </div>
            <div className="flex flex-col items-center gap-1">
                <div className="flex flex-col items-center gap-1">
                    {mission}
                    <div className="h-1 w-[calc(100%+1rem)] rounded-full bg-secondary"></div>
                </div>
                {/* Large separator */}
                <StudySelection
                    missionNb={missionNb}
                    missions={missions}
                    setMissionNb={setMissionNb}
                />
            </div>
        </div>
    );
};
