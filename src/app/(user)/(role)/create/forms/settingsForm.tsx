'use client';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { InputFormElement } from '@/components/meta-components/form/input';
import { Admin } from './cdpSchema';
import { DropdownSingleFormElement } from '@/components/meta-components/form/dropdownSingle';
import { CheckboxFormElement } from '@/components/meta-components/form/checkbox';

// export const settingsCreationSchema = z.object({
//     name: z.string(),
//     duration: z.number(),
//     deadline: z.string(),
//     cc: z.boolean(),
//     referent: zAdmin
// });

export interface SettingsFormProps {
    form: any;
    formId: string;
    admins: Admin[];
}

export default function SettingsForm({ form, formId, admins }: SettingsFormProps) {
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
                        formId={formId}
                    />
                    <InputFormElement
                        label="Durée estimée (en JEH)"
                        name="settings.duration"
                        type="number"
                        form={form}
                        formId={formId}
                    />
                    <InputFormElement
                        label="Deadline pre-étude"
                        name="settings.deadline"
                        type="date"
                        form={form}
                        formId={formId}
                    />
                    <CheckboxFormElement
                        label="CC ?"
                        name="settings.cc"
                        type="checkbox"
                        form={form}
                        formId={formId}
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
                    />
                </div>
            </BoxContent>
        </Box>
    );
}
