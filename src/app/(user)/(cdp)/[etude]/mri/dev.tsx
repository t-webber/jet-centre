import BigData from '@/../public/domains/big-data.png';
import Cyber from '@/../public/domains/cyber.png';
import Data from '@/../public/domains/data.png';
import Dev from '@/../public/domains/dev.png';
import Ima from '@/../public/domains/ima.png';
import Market from '@/../public/domains/market.png';
import Research from '@/../public/domains/research.png';
import Se from '@/../public/domains/se.png';
import Web from '@/../public/domains/web.png';

import { FormType } from './form/schema';

export const lipsumMri: FormType = {
    title: 'Lorem Ipsum',
    intro: 'Lorem Ipsum',
    domain: 'dev',
    pay_under: 241,
    pay_over: 239,
    difficulty: 'Lorem Ipsum',
    pay_level: 'Lorem Ipsum',
    skills: 'Lorem Ipsum',
    due_date: 'Lorem Ipsum',
    description: 'Lorem Ipsum',
};

export function getDomain(domain: string) {
    return { text: 'Développement', image: Dev };
}
export function getPay(pay_under: number, pay_over: number, pay_level: string) {
    return {
        text: `${pay_under}€ - ${pay_over}€`,
        image: Dev,
    };
}
export function getDifficulty(difficulty: string) {
    return {
        text: difficulty,
        image: Dev,
    };
}
