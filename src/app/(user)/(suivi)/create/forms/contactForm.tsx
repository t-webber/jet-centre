'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { Button } from '@/components/ui/button';
import { FormProvider, FormRow } from '@/components/ui/form';
import { InputFormElement } from '@/components/meta-components/form/input';
import { DropdownManyFormElement } from '@/components/meta-components/form/dropdownMany';

import {
    contactCreationSchema,
    ContactCreationSchema,
    ContactFormValue,
    emptyContactCreationSchema,
    NewContact
} from './contactSchema';

export interface ContactFormProps {
    form: any;
    contacts: ContactFormValue[];
    updated: boolean;
}

export function ContactForm({ form, contacts, updated }: ContactFormProps) {
    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>Contacts</BoxTitle>
            </BoxHeader>
            <BoxContent>
                <div className="flex flex-col gap-2">
                    <DropdownManyFormElement
                        label="Contacts"
                        name="contact.contact"
                        values={contacts}
                        getKeyOfValue={(contact) => contact.id}
                        displayValue={(contact) => {
                            // const job = contact.job ? <span><span/> : <></>;
                            return (
                                <span>
                                    {contact.firstName + ' ' + contact.lastName}{' '}
                                    {contact.job ? (
                                        <span className="pl-2 italic">({contact.job})</span>
                                    ) : (
                                        <></>
                                    )}
                                </span>
                            );
                        }}
                        form={form}
                        ping-once={updated}
                    />
                </div>
            </BoxContent>
        </Box>
    );
}

export interface ContactCreationFormProps {
    addContact: (contact: NewContact) => void;
}

export function ContactCreationForm({ addContact }: ContactCreationFormProps) {
    const form = useForm<ContactCreationSchema>({
        resolver: zodResolver(contactCreationSchema),
        defaultValues: emptyContactCreationSchema
    });

    function onSubmit(data: ContactCreationSchema) {
        addContact({ ...data, id: 'tmp-id-' + Math.random().toString(), isNew: {} });
        form.reset();
    }

    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>Définir un nouveau contact</BoxTitle>
            </BoxHeader>
            <BoxContent>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormRow>
                            <InputFormElement
                                label="Prénom du client"
                                name="firstName"
                                className="w-1/2"
                                form={form}
                            />
                            <InputFormElement
                                label="Nom du client"
                                name="lastName"
                                className="w-1/2"
                                form={form}
                            />
                        </FormRow>
                        <InputFormElement
                            label="Email du client"
                            name="email"
                            type="email"
                            form={form}
                        />
                        <InputFormElement
                            label="Téléphone du client"
                            name="tel"
                            type="tel"
                            form={form}
                        />
                        <InputFormElement label="Poste dans l'entreprise" name="job" form={form} />
                        <InputFormElement
                            label="Description (quand le contacter)"
                            name="description"
                            form={form}
                        />
                        <Button type="submit" className="w-full" variant="outline">
                            Définir ce contact
                        </Button>
                    </form>
                </FormProvider>
            </BoxContent>
        </Box>
    );
}
