'use client';

import { Box, BoxHeader, BoxTitle, BoxContent } from '@/components/boxes/boxes';
import { ReactNode } from 'react';

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emptyStudyCreationSchema, studyCreationSchema, StudyCreationSchema } from './forms/schema';
import CompanyForm from './forms/companyForm';
import { ContactForm } from './forms/contactForm';

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

    const DBG_CONTACTS = [
        {
            id: '001',
            firstName: 'John',
            lastName: 'Doe'
        }
    ];

    return (
        <>
            <form id="create-study"></form>
            <form id="create-contact"></form>
            <Form {...form}>
                <div className="grid grid-cols-2 gap-main">
                    <CompanyForm form={form} formId="create-study" />
                    <SimpleBox title="Chefs de projets">
                        <p></p>
                        {/* <AdminSelection dbAdmins={missionData.cdps || []} admins={admins} /> */}
                    </SimpleBox>
                    <ContactForm
                        form={form}
                        contacts={DBG_CONTACTS}
                        studyFormId="create-study"
                        contactFormId="create-contact"
                    />
                    <SimpleBox title="Paramètres de l'étude">
                        <p></p>
                        {/* <StudyParams studyData={missionData.study} admins={admins} /> */}
                    </SimpleBox>
                </div>
            </Form>
        </>
    );
}
