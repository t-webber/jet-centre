import { Box, BoxHeader, BoxTitle, BoxContent } from '@/components/boxes/boxes';
import { AdminSelection, StudyParams, ContactSelector, ComapnySelector } from './selectors';
import { CompanyContact, getMissionData, MissionData } from './contants';

export default async function CreateStudy() {
    const missionData: MissionData = getMissionData();
    const contacts: CompanyContact[] = [];
    const admins = ['Pierre', 'Paul', 'Jacques'];
    const dbDomains: string[] = [];

    return (
        <div className=" grid grid-cols-2 gap-main">
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>Informations générales sur l&apos;entreprise</BoxTitle>
                </BoxHeader>
                <BoxContent>
                    <ComapnySelector company={missionData.company?.general} dbDomains={dbDomains} />
                </BoxContent>
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
