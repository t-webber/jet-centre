import { z } from 'zod';

import { arrayEqual } from '@/lib/utils';

export const clientAddressSchema = z.object({
    number: z.string(),
    street: z.string(),
    city: z.string(),
    country: z.string(),
    zipCode: z.string(),
});

export type ClientAddressType = z.infer<typeof clientAddressSchema>;

export const clientFormSchema = z.object({
    studyClientId: z.string(),
    clientId: z.string(),
    job: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    number: z.string().optional(),
    email: z.string().optional(),
    address: clientAddressSchema.optional(),
});

export type ClientFormType = z.infer<typeof clientFormSchema>;

export const studyClientsFormSchema = z.object({
    clients: z.array(clientFormSchema),
    studyId: z.string(),
});

export type StudyClientsFormType = z.infer<typeof studyClientsFormSchema>;

export function checkEqual(lhs: StudyClientsFormType, rhs: StudyClientsFormType) {
    return (
        lhs.studyId == rhs.studyId &&
        arrayEqual(
            lhs.clients,
            rhs.clients,
            (client1, client2) =>
                client1.clientId === client2.clientId &&
                client1.studyClientId === client2.studyClientId &&
                client1.job === client2.job &&
                client1.firstName === client2.firstName &&
                client1.lastName === client2.lastName &&
                client1.number === client2.number &&
                client1.email === client2.email &&
                client1.address?.number === client2.address?.number &&
                client1.address?.street === client2.address?.street &&
                client1.address?.city === client2.address?.city &&
                client1.address?.country === client2.address?.country &&
                client1.address?.zipCode === client2.address?.zipCode
        )
    );
}
