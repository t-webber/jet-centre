import { z } from 'zod';

import { arrayEqual } from '@/lib/utils';

export const clientFormSchema = z.object({
    id: z.string(),
    job: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    number: z.string().optional(),
    email: z.string(),
    addressNb: z.string(),
    addressStreet: z.string(),
    addressCity: z.string(),
    addressCountry: z.string(),
});

export type ClientFormType = z.infer<typeof clientFormSchema>;

export const studyClientsFormSchema = z.array(clientFormSchema);

export type StudyClientsFormType = z.infer<typeof studyClientsFormSchema>;

export function checkEqual(lhs: StudyClientsFormType, rhs: StudyClientsFormType) {
    return arrayEqual(
        lhs,
        rhs,
        (client1, client2) =>
            client1.id === client2.id &&
            client1.job === client2.job &&
            client1.firstName === client2.firstName &&
            client1.lastName === client2.lastName &&
            client1.number === client2.number &&
            client1.email === client2.email &&
            client1.addressNb === client2.addressNb &&
            client1.addressStreet === client2.addressStreet &&
            client1.addressCity === client2.addressCity &&
            client1.addressCountry === client2.addressCountry
    );
}
