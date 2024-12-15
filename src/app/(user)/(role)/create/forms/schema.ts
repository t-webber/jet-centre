import { z } from 'zod';
import { companyCreationSchema, emptyCompanyCreationSchema } from './companySchema';
import { contactSchema, emptyContactSchema } from './contactSchema';

export const studyCreationSchema = z.object({
    company: companyCreationSchema,
    contact: contactSchema
});

export type StudyCreationSchema = z.infer<typeof studyCreationSchema>;

export const emptyStudyCreationSchema: StudyCreationSchema = {
    company: emptyCompanyCreationSchema,
    contact: emptyContactSchema
};
