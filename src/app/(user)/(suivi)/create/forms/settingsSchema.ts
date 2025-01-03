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
    firstName: z.string().min(1).trim(),
    lastName: z.string().min(1).trim(),
    email: z.string().email(),
    tel: z.string().optional()
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
    name: z.string(),
    duration: z.number(),
    deadline: z.string(),
    cc: z.boolean(),
    referent: zAdminFormValue,
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
