import { Box, BoxHeader, BoxTitle, BoxContent } from '@/components/boxes/boxes';
import { AdminSelection, StudyParams, ContactSelector } from './selectors';

interface CompanyData {
    id: number;
    name: string;
    size: 'µE' | 'PME' | 'ME' | 'GE'; // https://www.economie.gouv.fr/cedef/entreprises-categories,
    domain: string;
    ca?: string;
    addresse: string;
}

export interface StudyData {
    name: string;
    cc: boolean;
    ref_suivi: string;
    length: string;
    nb_contributors: number;
    deadline_preetude: Date;
}

export interface CompanyContact {
    name: string;
    job: string;
    email?: string;
    tel?: string;
    address?: string;
}

interface MissionData {
    company?: { general: CompanyData; contacts: CompanyContact[] };
    study?: StudyData;
    cdps?: string[];
}

function getMissionData() {
    return {};
}

export default function CreateStudy() {
    const missionData: MissionData = getMissionData();
    const contacts: CompanyContact[] = [];
    const admins = ['Pierre', 'Paul', 'Jacques'];

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
                <BoxContent>
                    <AdminSelection dbAdmins={missionData.cdps || []} admins={admins} />
                </BoxContent>
            </Box>
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>Contacts privilégié</BoxTitle>
                </BoxHeader>
                <BoxContent>
                    <ContactSelector
                        companyContacts={contacts}
                        studyContacts={missionData.company?.contacts || []}
                    />
                </BoxContent>
            </Box>
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>Paramètres de l&apos;étude</BoxTitle>
                </BoxHeader>
                <BoxContent>
                    <StudyParams studyData={missionData.study} admins={admins} />
                </BoxContent>
            </Box>
        </div>
    );
}
