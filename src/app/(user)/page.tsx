import { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/actions/auth';

export const metadata = {
    title: 'Dashboard'
} satisfies Metadata;

const HomePage = async () => {
    const email = (await auth())?.user?.email;
    return (
        <div className="space-y-4">
            <div className="mb-4">Bienvenue sur le site de Telecom Etude</div>
            <div>U R {email || 'NO 1'}</div>
            <Link href="/create">
                <Button>Nouvelle étude</Button>
            </Link>
        </div>
    );
};

export default HomePage;
