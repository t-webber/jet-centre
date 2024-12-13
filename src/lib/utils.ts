import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// See: https://github.com/johnridesabike/coronate/blob/master/src/HtmlEntities.res
export const nbsp = '\u00A0';
