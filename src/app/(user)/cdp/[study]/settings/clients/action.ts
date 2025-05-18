'use server';

import { Address, Prisma } from '@prisma/client';

import prisma from '@/db';
import { dbg } from '@/lib/utils';

import { ClientFormType, StudyClientsFormType } from './schema';

type Data<UpdateInput, UncheckedUpdateInput> =
    | (Prisma.Without<UpdateInput, UncheckedUpdateInput> & UncheckedUpdateInput)
    | (Prisma.Without<UncheckedUpdateInput, UpdateInput> & Prisma.ClientUpdateInput);

type PlainAddress = Omit<Address, 'id' | 'personId' | 'companyId'>;

export async function getMissionClients(
    studyCode: string
): Promise<StudyClientsFormType | undefined> {
    try {
        const study = (
            await prisma.studyInfos.findUnique({
                where: { code: studyCode },
                select: {
                    study: {
                        select: {
                            id: true,
                            clients: {
                                select: {
                                    id: true,
                                    client: {
                                        include: {
                                            company: {
                                                select: {
                                                    name: true,
                                                    companyInfos: true,
                                                    address: true,
                                                },
                                            },
                                            person: { include: { address: true } },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            })
        )?.study;
        if (!study) {
            throw new Error('Erroneous study code');
        }

        const clients: ClientFormType[] = study.clients.map(({ id, client }) => {
            const missionClient: ClientFormType = {
                studyClientId: id,
                clientId: client.id,
                job: client.job,
                firstName: client.person.firstName,
                lastName: client.person.lastName,
                email: client.person.email ?? undefined,
                number: client.person.number ?? undefined,
            };

            if (client.person.address) {
                missionClient.address = {
                    number: client.person.address.streetNumber,
                    street: client.person.address.streetName,
                    city: client.person.address.city,
                    country: client.person.address.country,
                    zipCode: client.person.address.zipCode,
                };
            }

            if (client.company) {
                missionClient.company = {
                    name: client.company.name,
                    size: client.company.companyInfos.size ?? undefined,
                    ca: client.company.companyInfos.ca ?? undefined,
                    domains: client.company.companyInfos.domains,
                    id: client.company.companyInfos.id,
                };

                if (client.company.address) {
                    missionClient.company.address = {
                        number: client.company.address.streetNumber,
                        street: client.company.address.streetName,
                        city: client.company.address.city,
                        country: client.company.address.country,
                        zipCode: client.company.address.zipCode,
                    };
                }
            }
            return missionClient;
        });

        return {
            clients,
            studyId: study.id,
        };
    } catch (e) {
        console.error(`[getMissionClients] ${e}`);
    }
}

export async function addClient(studyId: string, clientData: ClientFormType) {
    try {
        dbg(clientData, `adding data for ${studyId}`);

        const data: Data<Prisma.StudyUpdateInput, Prisma.StudyUncheckedUpdateInput> = {
            clients: {
                create: {
                    client: {
                        create: {
                            job: clientData.job,
                            person: {
                                create: {
                                    firstName: clientData.firstName,
                                    lastName: clientData.lastName,
                                    email: clientData.email,
                                    number: clientData.number,
                                },
                            },
                        },
                    },
                },
            },
        };

        if (
            !data.clients?.create ||
            !('client' in data.clients.create) ||
            !data.clients?.create?.client?.create?.person?.create
        ) {
            throw new Error('unreachable: missing create on person');
        }

        if (clientData.address) {
            data.clients.create.client.create.person.create.address = {
                create: {
                    streetNumber: clientData.address?.number,
                    streetName: clientData.address?.street,
                    city: clientData.address?.city,
                    country: clientData.address?.country,
                    zipCode: clientData.address?.zipCode,
                },
            };
        }

        if (clientData.company) {
            data.clients.create.client.create.company = {
                create: {
                    name: clientData.company?.name,
                    address: {},
                    companyInfos: {
                        create: {
                            domains: clientData.company?.domains,
                            size: clientData.company?.size,
                            ca: clientData.company?.ca,
                        },
                    },
                },
            };

            if (!data.clients.create.client.create.company.create)
                throw new Error('unreachable: missing create on company');
            if (clientData.company.address) {
                data.clients.create.client.create.company.create.address = {
                    create: {
                        streetNumber: clientData.company?.address?.number,
                        streetName: clientData.company?.address?.street,
                        city: clientData.company?.address?.city,
                        country: clientData.company?.address?.country,
                        zipCode: clientData.company?.address?.zipCode,
                    },
                };
            }
        }

        await prisma.study.update({
            where: { id: studyId },
            data,
        });
    } catch (e) {
        console.error(`[addClient] ${e}`);
    }
}

export async function updateClient(clientId: string, clientData: ClientFormType) {
    try {
        dbg(clientData, '############## new client data ##############');

        const data: Data<Prisma.ClientUpdateInput, Prisma.ClientUncheckedUpdateInput> = {
            job: clientData.job,
            person: {
                update: {
                    firstName: clientData.firstName,
                    lastName: clientData.lastName,
                    email: clientData.email,
                    number: clientData.number,
                },
            },
        };

        if (!data.person?.update) throw new Error('unreachable: missing update on person');

        if (clientData.address) {
            const address: PlainAddress = {
                streetNumber: clientData.address.number,
                streetName: clientData.address.street,
                city: clientData.address.city,
                country: clientData.address.country,
                zipCode: clientData.address.zipCode,
            };

            if (clientData.address.id) {
                data.person.update.address = {
                    update: address,
                };
            } else {
                data.person.update.address = {
                    create: address,
                };
            }
        }

        if (clientData.company) {
            if (clientData.company.id) {
                data.company = {
                    update: {
                        where: { id: clientData.company.id },
                        data: {
                            name: clientData.company.name,
                            companyInfos: {
                                update: {
                                    size: clientData.company.size ?? null,
                                    ca: clientData.company.ca ?? null,
                                    domains: clientData.company.domains,
                                },
                            },
                        },
                    },
                };
            } else {
                data.company = {
                    create: {
                        name: clientData.company.name,
                        companyInfos: {
                            create: {
                                size: clientData.company.size ?? null,
                                ca: clientData.company.ca ?? null,
                                domains: clientData.company.domains,
                            },
                        },
                    },
                };
            }

            if (clientData.company.address) {
                const address: PlainAddress = {
                    streetNumber: clientData.company.address?.number,
                    streetName: clientData.company.address?.street,
                    city: clientData.company.address?.city,
                    country: clientData.company.address?.country,
                    zipCode: clientData.company.address?.zipCode,
                };

                if (data.company.create && clientData.address?.id) {
                    throw new Error("unreachable: address can't exist without company");
                } else if (data.company.create) {
                    data.company.create.address = { create: address };
                } else if (data.company.update && clientData.address?.id) {
                    data.company.update.address = { update: address };
                } else if (data.company.update) {
                    data.company.update.address = { create: address };
                } else throw new Error('unreachable: company has neither create or update');
            }
        }

        dbg(data, '############## data ##############');

        await prisma.client.update({
            where: { id: clientId },
            data,
        });
    } catch (e) {
        console.error(`[updateClient] ${e}`);
    }
}

export async function removeClient(studyClientId: string) {
    try {
        await prisma.studyClient.delete({ where: { id: studyClientId } });
    } catch (e) {
        console.error(`[removeClient] ${e}`);
    }
}
