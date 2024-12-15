import { z } from 'zod';
import { emptyAdmin, zAdmin } from './cdpSchema';

export const settingsCreationSchema = z.object({
    name: z.string(),
    duration: z.number(),
    deadline: z.string(),
    cc: z.boolean(),
    referent: zAdmin
});

export type SettingsCreationSchema = z.infer<typeof settingsCreationSchema>;

export const emptySettingsCreationSchema = {
    name: '',
    duration: '',
    deadline: '',
    cc: false,
    referent: emptyAdmin
};
