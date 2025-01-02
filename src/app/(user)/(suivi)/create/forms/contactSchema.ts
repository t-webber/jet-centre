import { z } from 'zod';

export const zContact = z.object({
    firstName: z.string(),
    lastName: z.string(),
    job: z.string(),
    id: z.string()
});

export type Contact = z.infer<typeof zContact>;
export const emptyContact: Contact = {
    firstName: '',
    lastName: '',
    job: '',
    id: ''
};

export const contactSchema = z.object({
    contact: zContact.array()
});

export type ContactSchema = z.infer<typeof contactSchema>;
export const emptyContactSchema: ContactSchema = {
    contact: []
};

// ~~~~~~~~~~~ Contact Creation ~~~~~~~~~~ //
export const contactCreationSchema = z.object({
    firstName: z.string().min(1).trim(),
    lastName: z.string().min(1).trim(),
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

// ~~~~~~~~~~ Contact Form Value ~~~~~~~~~ //
export type NewContact = ContactCreationSchema & { id: string; isNew: {} };
export type ContactFormValue = Contact | NewContact;
