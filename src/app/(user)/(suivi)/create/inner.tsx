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
import { useEffect, useState } from 'react';
import { AdminFormValue } from './forms/settingsSchema';
import { onSubmit } from './actions';

export type CreateStudyProps = {
    contacts: ContactFormValue[];
    admins: AdminFormValue[];
};

export default function Inner({ contacts: contacts_, admins: admins_ }: CreateStudyProps) {
    // -------- Contact ------- //
    const [contacts, setContacts] = useState<ContactFormValue[]>(contacts_);
    const [contactsUpdated, setContactsUpdated] = useState(false);
    function addContact(contact: NewContact) {
        setContacts((prev) => [...prev, contact]);
        setTimeout(() => setContactsUpdated(true), 300);
        setTimeout(() => setContactsUpdated(false), 300 + 1000 + 50);
    }

    // --------- Admin -------- //
    const [admins, setAdmins] = useState<AdminFormValue[]>(admins_);
    const [adminsUpdated, setAdminsUpdated] = useState(false);
    function addAdmin(admin: AdminFormValue) {
        setAdmins((prev) => [...prev, admin]);
        setTimeout(() => setAdminsUpdated(true), 300);
        setTimeout(() => setAdminsUpdated(false), 300 + 1000 + 50);
    }

    // ---- Principal form ---- //
    const form = useForm<StudyCreationSchema>({
        resolver: zodResolver(studyCreationSchema),
        defaultValues: emptyStudyCreationSchema
    });

    useEffect(() => {
        console.log('errors', form.formState.errors);
    }, [form.formState.errors]);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-2main">
                <div className="flex flex-col gap-main lg:col-span-4">
                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit((d) => {
                                onSubmit(JSON.stringify(d));
                                form.reset();
                            })}
                            className="flex flex-col gap-main"
                            id="create-study-form"
                        >
                            <SettingsForm form={form} admins={admins} updated={adminsUpdated} />
                            <CompanyForm form={form} />
                            <ContactForm
                                form={form}
                                contacts={contacts}
                                updated={contactsUpdated}
                            />
                        </form>
                    </FormProvider>
                </div>
                <div className="flex flex-col gap-main lg:col-span-3">
                    <AdminCreationForm addAdmin={addAdmin} />
                    <ContactCreationForm addContact={addContact} />
                    <Button type="submit" className="w-fit ml-auto" formId="create-study-form">
                        Créer une nouvelle étude
                    </Button>
                </div>
            </div>
        </>
    );
}
