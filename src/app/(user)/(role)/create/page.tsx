'use client';

import { Box, BoxHeader, BoxTitle, BoxContent } from '@/components/boxes/boxes';
import { ReactNode } from 'react';

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emptyStudyCreationSchema, studyCreationSchema, StudyCreationSchema } from './forms/schema';
import CompanyForm from './forms/companyForm';

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

export default function CreateStudy() {
    const form = useForm<StudyCreationSchema>({
        resolver: zodResolver(studyCreationSchema),
        defaultValues: emptyStudyCreationSchema
    });

    // const missionData: MissionData = getMissionData();
    // const contacts: CompanyContact[] = [
    //     { name: 'Bernard', job: 'CEO', email: 'a@a.a', description: 'Admin' }
    // ];
    // const admins = ['Pierre', 'Paul', 'Jacques'];
    // const dbDomains: string[] = [];

    return (
        <Form {...form}>
            <form>
                <div className="grid grid-cols-2 gap-main">
                    <CompanyForm form={form} />
                    <SimpleBox title="Chefs de projets">
                        <p></p>
                        {/* <AdminSelection dbAdmins={missionData.cdps || []} admins={admins} /> */}
                    </SimpleBox>
                    <SimpleBox title="Contacts privilégié">
                        <p></p>
                        {/* <ContactSelector
                            companyContacts={contacts}
                            studyContacts={missionData.company?.contacts || []}
                        /> */}
                    </SimpleBox>
                    <SimpleBox title="Paramètres de l'étude">
                        <p></p>
                        {/* <StudyParams studyData={missionData.study} admins={admins} /> */}
                    </SimpleBox>
                </div>
            </form>
        </Form>
    );
}
