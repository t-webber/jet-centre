'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { Button } from '@/components/ui/button';
import { FormProvider, FormRow } from '@/components/ui/form';
import { InputFormElement } from '@/components/meta-components/form/input';
import { DropdownSingleFormElement } from '@/components/meta-components/form/dropdownSingle';

import {
    AdminCreationSchema,
    adminCreationSchema,
    AdminFormValue,
    emptyAdminCreationSchema,
    NewAdmin
} from './settingsSchema';
import { DropdownManyFormElement } from '@/components/meta-components/form/dropdownMany';
import { CheckboxFormElement } from '@/components/meta-components/form/checkbox';

export interface SettingsFormProps {
    form: any;
    admins: AdminFormValue[];
    updated: boolean;
}

export function SettingsForm({ form, admins, updated }: SettingsFormProps) {
    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>Paramètres de l&apos;étude</BoxTitle>
            </BoxHeader>
            <BoxContent>
                <div className="flex flex-col gap-2">
                    <InputFormElement label="Nom de l'étude" name="settings.name" form={form} />
                    <InputFormElement
                        label="Durée estimée (en JEH)"
                        name="settings.duration"
                        type="number"
                        form={form}
                    />
                    <InputFormElement
                        label="Deadline pre-étude"
                        name="settings.deadline"
                        type="date"
                        form={form}
                    />
                    <CheckboxFormElement
                        label="CC ?"
                        name="settings.cc"
                        type="checkbox"
                        form={form}
                    />
                    {/* <DropdownSingleFormElement
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
                        ping-once={updated}
                    /> */}
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
                        ping-once={updated}
                    />
                </div>
            </BoxContent>
        </Box>
    );
}

export interface AdminCreationFormProps {
    addAdmin: (admin: NewAdmin) => void;
}

export function AdminCreationForm({ addAdmin }: AdminCreationFormProps) {
    const form = useForm<AdminCreationSchema>({
        resolver: zodResolver(adminCreationSchema),
        defaultValues: emptyAdminCreationSchema
    });

    function onSubmit(data: AdminCreationSchema) {
        addAdmin({ ...data, id: 'tmp-id-' + Math.random().toString(), isNew: {} });
        form.reset();
    }

    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>Définir un nouvel administrateur</BoxTitle>
            </BoxHeader>
            <BoxContent>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <FormRow>
                                <InputFormElement
                                    label="Prénom de l'administrateur"
                                    name="firstName"
                                    className="w-1/2"
                                    form={form}
                                />
                                <InputFormElement
                                    label="Nom de l'administrateur"
                                    name="lastName"
                                    className="w-1/2"
                                    form={form}
                                />
                            </FormRow>
                            <InputFormElement
                                label="Email de l'administrateur"
                                name="email"
                                type="email"
                                form={form}
                            />
                            <InputFormElement
                                label="Téléphone de l'administrateur"
                                name="tel"
                                type="tel"
                                form={form}
                            />
                            <Button type="submit" className="w-full" variant="outline">
                                Ajouter cet administrateur
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </BoxContent>
        </Box>
    );
}
