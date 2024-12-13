import * as z from 'zod';

export const DOMAINS: string[] = [
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
    "État de l'art",
];

export const DIFFICULTIES = ['Faible', 'Moyenne', 'Élevée'];
export const PAYS = ['Faible', 'Moyenne', 'Élevée'];

export const mriCreationSchema = z.object({
    title: z.string(),
    intro: z.string(),
    domain: z.enum(DOMAINS as [string, ...string[]]),
    pay_under: z.number(),
    pay_over: z.number(),
    difficulty: z.enum(DIFFICULTIES as [string, ...string[]]),
    pay_level: z.enum(PAYS as [string, ...string[]]),
    skills: z.string(),
    due_date: z.string(),
    description: z.string(),
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
    title: "Titre de l'étude loadé",
    intro: 'Nous vous proposons une étude...',
    skills: 'Nous recherchons un.e intervenant.e ayant des compétences en...',
    due_date: 'Le client désire commencer le plus tôt possible.',
    description: 'Le but de cette étude est de...',
};
