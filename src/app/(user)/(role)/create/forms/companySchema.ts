import { zDOMAINS } from '@/settings/vars';
import { number, z } from 'zod';

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
    name: z.string(),
    size: zCompanySize,
    domains: z.array(zDOMAINS),
    ca: z.number(),
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
    size: COMPANY_SIZES[0],
    domains: [],
    ca: 0,
    address: {
        number: '',
        street: '',
        city: '',
        zip: '',
        country: ''
    }
};
