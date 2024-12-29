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

// ~~~~~~~~~~~~~~~ Settings ~~~~~~~~~~~~~~ //
export const settingsCreationSchema = z.object({
    name: z.string(),
    duration: z.number(),
    deadline: z.string(),
    cc: z.boolean(),
    referent: zAdmin,
    cdps: z.array(zAdmin)
});

export type SettingsCreationSchema = z.infer<typeof settingsCreationSchema>;

export const emptySettingsCreationSchema = {
    name: '',
    duration: '',
    deadline: '',
    cc: false,
    referent: emptyAdmin,
    cdps: []
};

// ~~~~~~~~~~~ Admin Creation ~~~~~~~~~~ //
export const adminCreationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
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
