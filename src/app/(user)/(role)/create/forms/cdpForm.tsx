'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { Button } from '@/components/ui/button';
import { Form, FormRow, FormRule } from '@/components/ui/form';
import { InputFormElement } from '@/components/meta-components/form/input';
import { DropdownSingleFormElement } from '@/components/meta-components/form/dropdownSingle';

import { Admin, cdpCreationSchema, CdPCreationSchema, emptyCdPCreationSchema } from './cdpSchema';
import { DropdownManyFormElement } from '@/components/meta-components/form/dropdownMany';

export interface CdPFormProps {
    form: any;
    cdps: Admin[];
    studyFormId: string;
    cdpFormId: string;
}

export function CdPForm({ form, cdps, studyFormId, cdpFormId }: CdPFormProps) {
    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>Chefs de projets</BoxTitle>
            </BoxHeader>
            <BoxContent>
                <div className="flex flex-col gap-2">
                    <DropdownManyFormElement
                        label="Administrateurs existants"
                        name="cdps.cdps"
                        values={cdps}
                        getKeyOfValue={(cdp) => cdp.id}
                        displayValue={(cdp) =>
                            cdp.firstName && cdp.lastName && cdp.firstName + ' ' + cdp.lastName
                        }
                        form={form}
                    />
                    <FormRule primary />
                    <CdPCreationForm formId={cdpFormId} />
                    {/* <FormRule primary />
                    <DeletableItemList
                        items={cdps}
                        deleteItem={(cdp) => addRemoveKey(cdp, cdps, setCdPs)}
                    /> */}
                </div>
            </BoxContent>
        </Box>
    );
}

function CdPCreationForm({ formId }: { formId: string }) {
    const form = useForm<CdPCreationSchema>({
        resolver: zodResolver(cdpCreationSchema),
        defaultValues: emptyCdPCreationSchema
    });

    return (
        <Form {...form}>
            <form className="flex flex-col gap-2">
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
            </form>
        </Form>
    );
}
