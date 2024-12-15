import { z } from 'zod';

export const zContact = z.object({
    firstName: z.string(),
    lastName: z.string(),
    id: z.string()
});

export type Contact = z.infer<typeof zContact>;
export const emptyContact: Contact = {
    firstName: '',
    lastName: '',
    id: ''
};

export const contactSchema = z.object({
    contact: zContact
});

export type ContactSchema = z.infer<typeof contactSchema>;
export const emptyContactSchema: ContactSchema = {
    contact: emptyContact
};

// ~~~~~~~~~~~ Contact Creation ~~~~~~~~~~ //
export const contactCreationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    tel: z.string().optional(),
    description: z.string(),
    job: z.string()
});

export type ContactCreationSchema = z.infer<typeof contactCreationSchema>;
export const emptyContactCreationSchema: ContactCreationSchema = {
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    description: '',
    job: ''
};
