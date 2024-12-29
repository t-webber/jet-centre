import { NavigationTemplate } from '../menu-template';
import { StudySelection } from './studySelection';

export const SuiviNavbar = ({
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
                href: '/create',
                name: "Création d'études"
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
