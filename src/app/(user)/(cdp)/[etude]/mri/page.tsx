import { Metadata } from 'next';
import Inner from './inner';

export const metadata = {
    title: 'Écriture MRI'
} satisfies Metadata;

export default function MRI({ params: { etude } }: { params: { etude: string } }) {
    return <Inner etude={etude} />;
}
