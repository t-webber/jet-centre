import { Box, BoxContent, BoxHeader, BoxLink, BoxTitle } from '@/components/boxes/boxes';
import { Metadata } from 'next';

export const metadata = {
    title: 'Écriture MRI',
} satisfies Metadata;

export default () => {
    return (
        <div className="flex space-x-main">
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>MRI à valider</BoxTitle>
                    <BoxLink href="blog">Lien vers les missions</BoxLink>
                </BoxHeader>
                <BoxContent>d</BoxContent>
            </Box>
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>MRI à valider</BoxTitle>
                </BoxHeader>
                <BoxContent>d</BoxContent>
            </Box>
        </div>
    );
};
