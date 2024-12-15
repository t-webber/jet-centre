import { z } from 'zod';

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

export const cdpSchema = z.object({
    cdps: z.array(zAdmin)
});

export type CdPSchema = z.infer<typeof cdpSchema>;
export const emptyCdPSchema: CdPSchema = {
    cdps: []
};

// ~~~~~~~~~~~ CdP Creation ~~~~~~~~~~ //
export const cdpCreationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    tel: z.string().optional()
});

export type CdPCreationSchema = z.infer<typeof cdpCreationSchema>;
export const emptyCdPCreationSchema: CdPCreationSchema = {
    firstName: '',
    lastName: '',
    email: '',
    tel: ''
};
