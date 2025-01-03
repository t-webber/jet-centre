import { EMPTY_STRING, required, stringDate } from '@/lib/zodExtends';
import { z } from 'zod';

// ~~~~~~~~~~~~~~~~ Admin ~~~~~~~~~~~~~~~~ //
export const zAdmin = z.object({
    firstName: z.string(),
    lastName: z.string(),
    id: z.string()
});

export type Admin = z.infer<typeof zAdmin>;
export const emptyAdmin: Admin = {
    firstName: '',
    lastName: '',
    id: ''
};

// ~~~~~~~~~~~ Admin Creation ~~~~~~~~~~ //
export const adminCreationSchema = z.object({
    firstName: z.string().superRefine(required),
    lastName: z.string().superRefine(required),
    email: z.string().email(),
    tel: z.string().or(EMPTY_STRING)
});

export type AdminCreationSchema = z.infer<typeof adminCreationSchema>;
export const emptyAdminCreationSchema: AdminCreationSchema = {
    firstName: '',
    lastName: '',
    email: '',
    tel: ''
};

// ~~~~~~~~~~~ Admin Form Value ~~~~~~~~~~ //
export const zNewAdmin = adminCreationSchema.merge(
    z.object({ id: z.string(), isNew: z.object({}) })
);

export type NewAdmin = z.infer<typeof zNewAdmin>;

export const zAdminFormValue = zNewAdmin.or(zAdmin);
export type AdminFormValue = z.infer<typeof zAdminFormValue>;

// ~~~~~~~~~~~~~~~ Settings ~~~~~~~~~~~~~~ //
export const settingsCreationSchema = z.object({
    name: z.string().superRefine(required),
    duration: z.number().or(EMPTY_STRING),
    deadline: z.string().superRefine(required).superRefine(stringDate),
    cc: z.boolean(),
    referent: zAdminFormValue.superRefine(required),
    cdps: zAdminFormValue.array()
});

export type SettingsCreationSchema = z.infer<typeof settingsCreationSchema>;

export const emptySettingsCreationSchema = {
    name: '',
    duration: '',
    deadline: '',
    cc: false,
    referent: '',
    cdps: []
};
