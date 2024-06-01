import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

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
    return (
        <>
            <div className="flex-1">
                <div>Hello World</div>
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
