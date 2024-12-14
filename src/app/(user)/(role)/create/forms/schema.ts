import { z } from 'zod';
import { companyCreationSchema, emptyCompanyCreationSchema } from './companySchema';

export const studyCreationSchema = z.object({
    company: companyCreationSchema
});

export type StudyCreationSchema = z.infer<typeof studyCreationSchema>;

export const emptyStudyCreationSchema: StudyCreationSchema = {
    company: emptyCompanyCreationSchema
};
