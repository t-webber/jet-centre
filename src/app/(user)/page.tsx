import { Metadata } from 'next';

export const metadata = {
    title: 'Dashboard',
} satisfies Metadata;

const HomePage = () => {
    return <div>Bienvenue sur le site de Telecom Etude</div>;
};

export default HomePage;
