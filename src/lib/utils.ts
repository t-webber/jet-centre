import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getProperty(obj: any, path: string) {
    return path.split('.').reduce((acc, key) => acc[key], obj);
}

// See: https://github.com/johnridesabike/coronate/blob/master/src/HtmlEntities.res
export const nbsp = '\u00A0';
