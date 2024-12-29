import { Button } from '@/components/ui/button';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';

export function StudySelection({
    missionNb,
    missions,
    setMissionNb
}: {
    missionNb: number;
    missions: string[];
    setMissionNb: (missionNb: number) => void;
}) {
    return (
        <Pagination>
            <PaginationContent className="gap-4">
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() =>
                            setMissionNb((missionNb - 1 + missions.length) % missions.length)
                        }
                    ></PaginationPrevious>
                </PaginationItem>
                {missions.map((m, i) => (
                    <PaginationItem key={i} className="flex items-center">
                        <Button
                            className="rounded-full aspect-square w-4 h-4 border-0 p-0"
                            variant={missionNb === i ? 'default' : 'secondary'}
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
    );
}
