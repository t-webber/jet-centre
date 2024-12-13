import { z } from 'zod';

const zDOMAINS = z.enum([
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
const zDIFFICULTIES = z.enum(['Faible', 'Moyenne', 'Élevée']);
const zPAYS = z.enum(['Faible', 'Moyenne', 'Élevée']);

export type Domains = z.infer<typeof zDOMAINS>;
export const DOMAINS: Domains[] = zDOMAINS.options;

export type Difficulties = z.infer<typeof zDIFFICULTIES>;
export const DIFFICULTIES: Difficulties[] = zDIFFICULTIES.options;

export type Pays = z.infer<typeof zPAYS>;
export const PAYS: Pays[] = zPAYS.options;

export const mriCreationSchema = z.object({
    title: z.string(),
    intro: z.string(),
    domain: zDOMAINS,
    difficulty: zDIFFICULTIES,
    pay_level: zPAYS,
    pay_under: z.number(),
    pay_over: z.number(),
    skills: z.string(),
    due_date: z.string(),
    description: z.string()
});

export type FormType = z.infer<typeof mriCreationSchema>;

export const emptyMriCreationSchema: FormType = {
    title: '',
    intro: '',
    domain: DOMAINS[0],
    pay_under: 0,
    pay_over: 0,
    difficulty: DIFFICULTIES[0],
    pay_level: PAYS[0],
    skills: '',
    due_date: '',
    description: ''
};

export const defaultMriCreationSchema = {
    ...emptyMriCreationSchema,
    ...{
        title: "Développement d'un tableau de bord dynamique",
        intro: 'Nous vous proposons une étude...',
        skills: 'Nous recherchons un.e intervenant.e ayant des compétences en...',
        due_date: 'Le client désire commencer le plus tôt possible.',
        description: 'Le but de cette étude est de...'
    }
};
