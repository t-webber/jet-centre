import { Box, BoxHeader, BoxTitle, BoxContent } from '@/components/boxes/boxes';
import { AdminSelection, StudyParams, ComapnySelector } from './selectors';
import { CompanyContact, getMissionData, MissionData } from './contants';
import { ContactSelector } from './company-contacts';
import { ReactNode } from 'react';

function SimpleBox({ title, children }: { title: string; children: ReactNode }) {
    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>{title}</BoxTitle>
            </BoxHeader>
            <BoxContent>{children}</BoxContent>
        </Box>
    );
}

export default async function CreateStudy() {
    const missionData: MissionData = getMissionData();
    const contacts: CompanyContact[] = [
        { name: 'Bernard', job: 'CEO', email: 'a@a.a', description: 'Admin' }
    ];
    const admins = ['Pierre', 'Paul', 'Jacques'];
    const dbDomains: string[] = [];

    return (
        <div className="grid grid-cols-2 gap-main">
            <SimpleBox title="Informations générales sur l'entreprise">
                <ComapnySelector company={missionData.company?.general} dbDomains={dbDomains} />
            </SimpleBox>
            <SimpleBox title="Chefs de projets">
                <AdminSelection dbAdmins={missionData.cdps || []} admins={admins} />
            </SimpleBox>
            <SimpleBox title="Contacts privilégié">
                <ContactSelector
                    companyContacts={contacts}
                    studyContacts={missionData.company?.contacts || []}
                />
            </SimpleBox>
            <SimpleBox title="Paramètres de l'étude">
                <StudyParams studyData={missionData.study} admins={admins} />
            </SimpleBox>
        </div>
    );
}
