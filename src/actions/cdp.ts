import prisma from '@/db';
import { User } from 'next-auth';

export function get_user_missions(user: User | undefined) {
    return ['223072', '223073', '223074'];
}
