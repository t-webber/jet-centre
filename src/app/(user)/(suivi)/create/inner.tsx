'use client';

import { FormProvider } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emptyStudyCreationSchema, studyCreationSchema, StudyCreationSchema } from './forms/schema';
import CompanyForm from './forms/companyForm';
import { ContactCreationForm, ContactForm } from './forms/contactForm';
import { AdminCreationForm, SettingsForm } from './forms/settingsForm';
import { Button } from '@/components/ui/button';
import { ContactFormValue, NewContact } from './forms/contactSchema';
import { useState } from 'react';

export type CreateStudyProps = {
    contacts: ContactFormValue[];
};

export default function Inner({ contacts: contacts_ }: CreateStudyProps) {
    const form = useForm<StudyCreationSchema>({
        resolver: zodResolver(studyCreationSchema),
        defaultValues: emptyStudyCreationSchema
    });

    const [contacts, setContacts] = useState<ContactFormValue[]>(contacts_);
    function addContact(contact: NewContact) {
        setContacts((prev) => [...prev, contact]);
        setTimeout(() => setContactsUpdated(true), 500);
        setTimeout(() => setContactsUpdated(false), 500 + 1000 + 50);
    }

    const [contactsUpdated, setContactsUpdated] = useState(false);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-2main">
                <div className="flex flex-col gap-main lg:col-span-4">
                    <FormProvider {...form}>
                        <CompanyForm form={form} formId="create-study" />
                        <ContactForm form={form} contacts={contacts} updated={contactsUpdated} />
                        <SettingsForm
                            form={form}
                            studyFormId="create-study"
                            adminFormId="create-admin"
                        />
                    </FormProvider>
                </div>
                <div className="flex flex-col gap-main lg:col-span-3">
                    <ContactCreationForm addContact={addContact} />
                    <AdminCreationForm />
                    <Button type="submit" form="create-study" className="w-fit ml-auto">
                        Créer une nouvelle étude
                    </Button>
                </div>
            </div>
        </>
    );
}
