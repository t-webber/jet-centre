/**
 * See {@link https://www.economie.gouv.fr/cedef/entreprises-categories}.
 */
export const COMPANY_SIZES = [
    'Micro-entreprise',
    'Petite entreprise',
    'Moyenne entreprise',
    'Grande entreprise'
] as const;

export interface CompanyData {
    id: number;
    name: string;
    size: (typeof COMPANY_SIZES)[number];
    domains: string[];
    ca?: number;
    addresse: string;
}

export interface StudyData {
    name: string;
    cc: boolean;
    ref_suivi: string;
    length: string;
    nb_contributors: number;
    deadline_preetude: Date;
}

export interface CompanyContact {
    name: string;
    job: string;
    email?: string;
    tel?: string;
    address?: string;
}

export interface MissionData {
    company?: { general: CompanyData; contacts: CompanyContact[] };
    study?: StudyData;
    cdps?: string[];
}

export function getMissionData() {
    return {};
}
