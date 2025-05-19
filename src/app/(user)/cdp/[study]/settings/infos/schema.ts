import { Domain } from '@prisma/client';
import { z } from 'zod';

import { arrayEqual } from '@/lib/utils';

export const studyInfosParamsEditorFormSchema = z.object({
    title: z
        .string()
        .min(10, {
            message: 'Titre invalide.',
        })
        .optional(),
    applicationFee: z.number().optional(),
    cc: z.boolean(),
    domains: z.array(z.nativeEnum(Domain)),
});

export type StudyInfosParamsEditorFormType = z.infer<typeof studyInfosParamsEditorFormSchema>;

export function checkEqual(
    lhs: StudyInfosParamsEditorFormType,
    rhs: StudyInfosParamsEditorFormType
) {
    return (
        lhs.title === rhs.title &&
        lhs.applicationFee === rhs.applicationFee &&
        lhs.cc === rhs.cc &&
        arrayEqual(lhs.domains, rhs.domains)
    );
}
