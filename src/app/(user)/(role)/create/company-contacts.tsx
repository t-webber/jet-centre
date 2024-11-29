'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CompanyContact } from './contants';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { SingleCombobox } from '@/components/meta-components/combobox';
import { addRemoveKey, DeletableItemList } from '@/components/selectors';

const formSchema = z.object({
    name: z.string(),
    email: z.string().email().optional(),
    tel: z.number().optional(),
    description: z.string(),
    job: z.string()
});

function ContactSelectorForm({
    onSubmit
}: {
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: 'n',
            tel: 292
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom du client</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="job"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Poste dans l&apos;entreprise</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                                <Input type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (quand le contacter)</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" variant="outline">
                    Ajouter ce contact
                </Button>
            </form>
        </Form>
    );
}

export function ContactSelector({
    companyContacts,
    studyContacts
}: {
    companyContacts: CompanyContact[];
    studyContacts: CompanyContact[];
}) {
    const [contacts, setContacts] = useState(studyContacts.map((c) => c.name));
    const addContact = (contact: CompanyContact) => {
        addRemoveKey(contact.name, contacts, setContacts);
    };

    return (
        <>
            <SingleCombobox
                currentKey={null}
                selectKey={(contact) => addRemoveKey(contact, contacts, setContacts)}
                emptyMessage="Personne inexistante. Vous pouvez la créer ci-dessous."
                placeholder="Enter le nom"
                title="Rechercher un client déjà inséré"
                items={companyContacts.map((c) => c.name)}
            />
            <Separator primary />
            <ContactSelectorForm onSubmit={addContact} />
            <Separator primary />
            <DeletableItemList
                items={contacts}
                deleteItem={(contact) => addRemoveKey(contact, contacts, setContacts)}
            />
        </>
    );
}
