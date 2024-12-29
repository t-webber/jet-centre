'use client';

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emptyStudyCreationSchema, studyCreationSchema, StudyCreationSchema } from './forms/schema';
import CompanyForm from './forms/companyForm';
import { ContactForm } from './forms/contactForm';
import { SettingsForm } from './forms/settingsForm';
import { Button } from '@/components/ui/button';

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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-main">
                    <div className="flex flex-col gap-main">
                        <CompanyForm form={form} formId="create-study" />
                        <ContactForm
                            form={form}
                            studyFormId="create-study"
                            contactFormId="create-contact"
                        />
                    </div>
                    <div className="flex flex-col gap-main">
                        <SettingsForm
                            form={form}
                            studyFormId="create-study"
                            adminFormId="create-admin"
                        />
                        <Button type="submit" form="create-study">
                            Créer une nouvelle étude
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
}
