'use client';

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emptyStudyCreationSchema, studyCreationSchema, StudyCreationSchema } from './forms/schema';
import CompanyForm from './forms/companyForm';
import { ContactForm } from './forms/contactForm';
import { SettingsForm } from './forms/settingsForm';

export default function CreateStudy() {
    const form = useForm<StudyCreationSchema>({
        resolver: zodResolver(studyCreationSchema),
        defaultValues: emptyStudyCreationSchema
    });

    return (
        <>
            <form id="create-study"></form>
            <form id="create-contact"></form>
            <form id="create-admin"></form>
            <Form {...form}>
                <div className="grid grid-cols-2 gap-main">
                    <CompanyForm form={form} formId="create-study" />
                    <SettingsForm
                        form={form}
                        studyFormId="create-study"
                        adminFormId="create-admin"
                    />
                    <ContactForm
                        form={form}
                        studyFormId="create-study"
                        contactFormId="create-contact"
                    />
                </div>
            </Form>
        </>
    );
}
