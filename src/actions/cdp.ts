/**
 * Module that communicates with the database for the CDPs.
 */

import prisma from '@/db';
import { User } from 'next-auth';

/**
 * Function to fetch the different mission of a CDP.
 *
 * @export
 * @param {(User | undefined)} user
 * @return {string[]} - the list of missions
 */
export function get_user_missions(user: User | undefined) {
    return ['223072', '223073', '223074'];
}
