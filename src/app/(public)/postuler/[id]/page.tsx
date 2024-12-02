import { DragAndDrop } from './drag_and_drop';

export default function Postuler({ params: { id } }: { params: { id: string } }) {
    const missionName = 'Mission name';
    const src =
        'https://docs.google.com/forms/d/e/1FAIpQLSeFdbqAPj3xpAHyHyiSnfFXiqb2pVH29L2s6hqfhA-Tj6Zrlw/viewform?embedded=true';

    return (
        <div className="h-full flex flex-col gap-8">
            <h1 className="w-full text-center">{missionName}</h1>
            <DragAndDrop id={id} />
            <iframe src={src} className="w-full h-full">
                Loading...
            </iframe>
        </div>
    );
}
