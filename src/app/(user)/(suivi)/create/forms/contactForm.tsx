'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { Button } from '@/components/ui/button';
import { FormProvider, FormRow, FormRule } from '@/components/ui/form';
import { InputFormElement } from '@/components/meta-components/form/input';
import { DropdownSingleFormElement } from '@/components/meta-components/form/dropdownSingle';

import {
    Contact,
    contactCreationSchema,
    ContactCreationSchema,
    emptyContactCreationSchema
} from './contactSchema';
import { useState } from 'react';

export interface ContactFormProps {
    form: any;
    studyFormId: string;
    contactFormId: string;
}

export function ContactForm({ form, studyFormId, contactFormId }: ContactFormProps) {
    // TODO: prisma.Contacts.findMany()
    const DBG_CONTACTS = [
        {
            id: '001',
            firstName: 'John',
            lastName: 'Doe'
        },
        {
            id: '002',
            firstName: 'Alice',
            lastName: 'Smith'
        }
    ];

    let [contacts, setContacts] = useState<Contact[]>(DBG_CONTACTS);

    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>Contacts privilégié</BoxTitle>
            </BoxHeader>
            <BoxContent>
                <div className="flex flex-col gap-2">
                    <DropdownSingleFormElement
                        label="Contact existant"
                        name="contact.contact"
                        values={contacts}
                        getKeyOfValue={(contact) => contact.id}
                        displayValue={(contact) =>
                            contact.firstName &&
                            contact.lastName &&
                            contact.firstName + ' ' + contact.lastName
                        }
                        form={form}
                        formId={studyFormId}
                    />
                    <FormRule primary />
                    <ContactCreationForm formId={contactFormId} />
                </div>
            </BoxContent>
        </Box>
    );
}

function ContactCreationForm({ formId }: { formId: string }) {
    const form = useForm<ContactCreationSchema>({
        resolver: zodResolver(contactCreationSchema),
        defaultValues: emptyContactCreationSchema
    });

    return (
            <FormRow>
                <InputFormElement
                    label="Prénom du client"
                    name="firstName"
                    className="w-1/2"
                    form={form}
                    formId={formId}
                />
                <InputFormElement
                    label="Nom du client"
                    name="lastName"
                    className="w-1/2"
                    form={form}
                    formId={formId}
                />
            </FormRow>
            <InputFormElement
                label="Email du client"
                name="email"
                type="email"
                form={form}
                formId={formId}
            />
            <InputFormElement
                label="Téléphone du client"
                name="tel"
                type="tel"
                form={form}
                formId={formId}
            />
            <InputFormElement
                label="Poste dans l'entreprise"
                name="job"
                form={form}
                formId={formId}
            />
            <InputFormElement
                label="Description (quand le contacter)"
                name="description"
                form={form}
                formId={formId}
            />
            <Button type="submit" className="w-full" variant="outline" formId={formId}>
                Ajouter ce contact
            </Button>
                <FormProvider {...form}>
                </FormProvider>
    );
}
