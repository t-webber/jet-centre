/**
 * Catch all routes beginning with /api/auth, and use the next auth
 * handlers to define the CRUD methods GET and POST.
 *
 * @file route.ts
 * @donotmove - This file mus't be moved to another directory, as
 * it's location has got importance.
 */

import { handlers } from '@/actions/auth';

export const { GET, POST } = handlers;
