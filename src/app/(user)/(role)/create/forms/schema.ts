import { z } from 'zod';
import { companyCreationSchema, emptyCompanyCreationSchema } from './companySchema';
import { contactSchema, emptyContactSchema } from './contactSchema';

export const studyCreationSchema = z.object({
    company: companyCreationSchema,
    contact: contactSchema
});

export type StudyCreationSchema = z.infer<typeof studyCreationSchema>;

export const emptyStudyCreationSchema: StudyCreationSchema = {
    // @ts-ignore - react-hook-form use empty string ("") as default value even for non-string fields
    company: emptyCompanyCreationSchema,
    contact: emptyContactSchema
};
