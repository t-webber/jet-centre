import { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
    title: 'Dashboard'
} satisfies Metadata;

const HomePage = () => {
    return (
        <>
            <div className="mb-4">Bienvenue sur le site de Telecom Etude</div>
            <Link href="/create">
                <Button>Nouvelle étude</Button>
            </Link>
        </>
    );
};

export default HomePage;
