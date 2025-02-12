import { z, EMPTY_STRING, required, stringDate } from '@/lib/zod';

const zIsNew = z.object({
    isNew: z.boolean()
});

// ====================================================== //
// ======================== Admin ======================= //
// ====================================================== //

// ~~~~~~~~~~~~~~~~ Admin ~~~~~~~~~~~~~~~~ //
export const zAdmin = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    id: z.string()
});
export type Admin = z.infer<typeof zAdmin>;

// ~~~~~~~~~~~ Admin Creation ~~~~~~~~~~ //
export const adminCreationSchema = z.object({
    firstName: z.string().superRefine(required),
    lastName: z.string().superRefine(required),
    email: z.string().email(),
    tel: z.string(),
    id: z.string()
});

export type AdminCreationSchema = z.infer<typeof adminCreationSchema>;
export const emptyAdminCreationSchema = {
    firstName: '',
    lastName: '',
    email: '',
    tel: ''
};

// ~~~~~~~~~~~ Admin Form Value ~~~~~~~~~~ //
export const zNewAdmin = adminCreationSchema.merge(zIsNew);
export type NewAdmin = z.infer<typeof zNewAdmin>;

export const zAdminFormValue = zNewAdmin.or(zAdmin);
export type AdminFormValue = z.infer<typeof zAdminFormValue>;

// ====================================================== //
// ====================== Settings ====================== //
// ====================================================== //

export const settingsCreationSchema = z.object({
    name: z.string().superRefine(required),
    duration: z.number().or(EMPTY_STRING),
    deadline: z.string().superRefine(stringDate).or(EMPTY_STRING),
    cc: z.boolean(),
    cdps: zAdminFormValue.array()
});

export type SettingsCreationSchema = z.infer<typeof settingsCreationSchema>;

export const emptySettingsCreationSchema: SettingsCreationSchema = {
    name: '',
    duration: '',
    deadline: '',
    cc: false,
    cdps: []
};
