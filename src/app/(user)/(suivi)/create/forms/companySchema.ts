import { EMPTY_STRING, required } from '@/lib/zodExtends';
import { zDOMAINS } from '@/settings/vars';
import { z } from 'zod';

/**
 * See {@link https://www.economie.gouv.fr/cedef/entreprises-categories}.
 */
export const zCompanySize = z.enum([
    'Micro-entreprise',
    'Petite entreprise',
    'Moyenne entreprise',
    'Grande entreprise'
]);

export type CompanySize = z.infer<typeof zCompanySize>;
export const COMPANY_SIZES: CompanySize[] = zCompanySize.options;

export const companyCreationSchema = z.object({
    name: z.string().superRefine(required),
    size: zCompanySize.or(EMPTY_STRING),
    domains: z.array(zDOMAINS).optional(),
    ca: z.number().or(EMPTY_STRING),
    address: z.object({
        number: z.string(),
        street: z.string(),
        city: z.string(),
        zip: z.string(),
        country: z.string()
    })
});

export type CompanyCreationSchema = z.infer<typeof companyCreationSchema>;

export const emptyCompanyCreationSchema = {
    name: '',
    size: '',
    domains: [],
    ca: '',
    address: {
        number: '',
        street: '',
        city: '',
        zip: '',
        country: ''
    }
};
