import { z } from 'zod';

export const zCdP = z.object({
    firstName: z.string(),
    lastName: z.string(),
    id: z.string()
});

export type CdP = z.infer<typeof zCdP>;
export const emptyCdP: CdP = {
    firstName: '',
    lastName: '',
    id: ''
};

export const cdpSchema = z.object({
    cdps: z.array(zCdP)
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
