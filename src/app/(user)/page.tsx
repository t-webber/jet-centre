import { Metadata } from 'next';

import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'Dashboard'
} satisfies Metadata;

const HomePage = () => {
    return (
        <>
            <div className="mb-4">Bienvenue sur le site de Telecom Etude</div>
            <Button>
                <a href="/create">Nouvelle étude</a>
            </Button>
        </>
    );
};

export default HomePage;
