import { z } from 'zod';

export const DATA_FILES_PATH = './data';
export const ANIMATION_DURATION_MS = 200;

export const zDOMAINS = z.enum([
    'Data Science',
    'Machine Learning',
    'Intelligence Artificielle',
    'Développement Web',
    'Développement Mobile',
    'Développement logiciel',
    'Cybersécurité',
    'Cryptographie',
    'Systèmes embarqués',
    'Internet des objets',
    'Réseaux',
    'Télécommunications',
    'Internet',
    'Image',
    'Computer Graphics',
    '3D',
    'Étude de marché',
    "État de l'art"
]);

export type Domains = z.infer<typeof zDOMAINS>;
export const DOMAINS: Domains[] = zDOMAINS.options;
