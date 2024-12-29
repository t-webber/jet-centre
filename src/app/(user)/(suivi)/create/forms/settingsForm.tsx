'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { Button } from '@/components/ui/button';
import { Form, FormRow, FormRule } from '@/components/ui/form';
import { InputFormElement } from '@/components/meta-components/form/input';
import { DropdownSingleFormElement } from '@/components/meta-components/form/dropdownSingle';

import {
    Admin,
    adminCreationSchema,
    AdminCreationSchema,
    emptyAdminCreationSchema
} from './settingsSchema';
import { DropdownManyFormElement } from '@/components/meta-components/form/dropdownMany';
import { CheckboxFormElement } from '@/components/meta-components/form/checkbox';
import { useState } from 'react';

export interface SettingsFormProps {
    form: any;
    studyFormId: string;
    adminFormId: string;
}

export function SettingsForm({ form, studyFormId, adminFormId }: SettingsFormProps) {
    // TODO: prisma.Admins.findMany()
    const DBG_ADMINS = [
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

    const [admins, setAdmins] = useState<Admin[]>(DBG_ADMINS);

    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>Paramètres de l'étude</BoxTitle>
            </BoxHeader>
            <BoxContent>
                <div className="flex flex-col gap-2">
                    <InputFormElement
                        label="Nom de l'étude"
                        name="settings.name"
                        form={form}
                        formId={studyFormId}
                    />
                    <InputFormElement
                        label="Durée estimée (en JEH)"
                        name="settings.duration"
                        type="number"
                        form={form}
                        formId={studyFormId}
                    />
                    <InputFormElement
                        label="Deadline pre-étude"
                        name="settings.deadline"
                        type="date"
                        form={form}
                        formId={studyFormId}
                    />
                    <CheckboxFormElement
                        label="CC ?"
                        name="settings.cc"
                        type="checkbox"
                        form={form}
                        formId={studyFormId}
                    />
                    <DropdownSingleFormElement
                        label="Référent"
                        name="settings.referent"
                        values={admins}
                        getKeyOfValue={(admin) => admin.id}
                        displayValue={(admin) =>
                            admin.firstName &&
                            admin.lastName &&
                            admin.firstName + ' ' + admin.lastName
                        }
                        form={form}
                        formId={studyFormId}
                    />
                    <DropdownManyFormElement
                        label="Chef(fe)s de projet"
                        name="settings.cdps"
                        values={admins}
                        getKeyOfValue={(admin) => admin.id}
                        displayValue={(admin) =>
                            admin.firstName &&
                            admin.lastName &&
                            admin.firstName + ' ' + admin.lastName
                        }
                        form={form}
                        formId={studyFormId}
                    />
                    <FormRule primary />
                    <AdminCreationForm formId={adminFormId} />
                </div>
            </BoxContent>
        </Box>
    );
}

function AdminCreationForm({ formId }: { formId: string }) {
    const form = useForm<AdminCreationSchema>({
        resolver: zodResolver(adminCreationSchema),
        defaultValues: emptyAdminCreationSchema
    });

    return (
        <Form {...form}>
            <FormRow>
                <InputFormElement
                    label="Prénom de l'administrateur"
                    name="firstName"
                    className="w-1/2"
                    form={form}
                    formId={formId}
                />
                <InputFormElement
                    label="Nom de l'administrateur"
                    name="lastName"
                    className="w-1/2"
                    form={form}
                    formId={formId}
                />
            </FormRow>
            <InputFormElement
                label="Email de l'administrateur"
                name="email"
                type="email"
                form={form}
                formId={formId}
            />
            <InputFormElement
                label="Téléphone de l'administrateur"
                name="tel"
                type="tel"
                form={form}
                formId={formId}
            />
            <Button type="submit" className="w-full" variant="outline" formId={formId}>
                Ajouter cet administrateur
            </Button>
        </Form>
    );
}
