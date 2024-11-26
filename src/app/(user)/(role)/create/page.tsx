import { Box, BoxHeader, BoxTitle, BoxContent } from '@/components/boxes/boxes';

interface CompanyData {
    name: string;
    size: 'µE' | 'PME' | 'ME' | 'GE'; // https://www.economie.gouv.fr/cedef/entreprises-categories,
    domain: string;
    ca?: string;
    addresse: string;
}

interface StudyData {
    name: string;
    cc: boolean;
    ref_suivi: string;
    length: string;
    nb_contributors: number;
    deadline_preetude: Date;
}

interface CompanyContact {
    name: string;
    job: string;
    email?: string;
    tel?: string;
    address?: string;
}

export interface MissionData {
    company: { general: CompanyData; contact: CompanyContact[] };
    study: StudyData;
    cdps: string[];
}

export default function CreateStudyClient() {
    return (
        <div className=" grid grid-cols-2 gap-main">
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>Informations générales sur l&apos;entreprise</BoxTitle>
                </BoxHeader>
                <BoxContent>fields</BoxContent>
            </Box>
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>Chefs de projets</BoxTitle>
                </BoxHeader>
                <BoxContent>fields</BoxContent>
            </Box>
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>Contacts privilégié</BoxTitle>
                </BoxHeader>
                <BoxContent>fields</BoxContent>
            </Box>
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>Paramètres de l&apos;étude</BoxTitle>
                </BoxHeader>
                <BoxContent>fields</BoxContent>
            </Box>
        </div>
    );
}
