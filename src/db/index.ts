/**
 * File to initialise the prisma client for typescript. The goal of this script is to prevent
 * multiple {@link PrismaClient}. For more information, please refer to
 * {@link https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices|the documentation}.
 *
 * @file index.ts
 */

import { PrismaClient } from '@prisma/client';

function prismaClientSingleton() {
    return new PrismaClient().$extends({
        result: {
            companyInfos: {
                size: {
                    needs: { size: true },
                    compute(companyInfo) {
                        switch (companyInfo.size) {
                            case 'MicroEntreprise':
                                return 'Micro-entreprise';
                            case 'PetiteEntreprise':
                                return 'Petite entreprise';
                            case 'MoyenneEntreprise':
                                return 'Moyenne entreprise';
                            case 'GrandeEntreprise':
                                return 'Grande entreprise';
                        }
                    }
                }
            }
        }
    });
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
