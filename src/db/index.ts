/**
 * File to initialise the prisma client for typescript. The goal of this script is to prevent
 * multiple {@link PrismaClient}. For more information, please refer to
 * {@link https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices|the documentation}.
 *
 * @file index.ts
 */

import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import Redis from 'ioredis';

declare const globalThis: {
    prismaGlobal: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
    redisGlobal: Redis;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? new PrismaClient();
export const redis = !process.env.NO_CACHE
    ? (globalThis.redisGlobal ?? new Redis('redis://cache:6379/0'))
    : undefined;

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
if (process.env.NODE_ENV !== 'production' && !process.env.NO_CACHE)
    globalThis.redisGlobal = redis as Redis;
