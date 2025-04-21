'use server';

import prisma from '@/db';

import { ClientFormType, StudyClientsFormType } from './schema';

export async function getMissionClients(studyCode: string): Promise<StudyClientsFormType | void> {
    try {
        const study = (
            await prisma.studyInfos.findUnique({
                where: { code: studyCode },
                include: {
                    study: {
                        include: {
                            clients: {
                                include: {
                                    client: { include: { person: { include: { address: true } } } },
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
        return {
            clients: study.clients.map(({ id, client }) => {
                const serverAddress = client.person.address;
                let address = undefined;
                if (serverAddress) {
                    address = {
                        number: serverAddress.number,
                        street: serverAddress.street,
                        city: serverAddress.city,
                        country: serverAddress.country,
                        zipCode: serverAddress.zipCode,
                    };
                }
                return {
                    studyClientId: id,
                    clientId: client.id,
                    job: client.job,
                    firstName: client.person.firstName,
                    lastName: client.person.lastName,
                    email: client.person.email ?? undefined,
                    address,
                    number: client.person.number ?? undefined,
                } satisfies ClientFormType;
            }),
            studyId: study.id,
        };
    } catch (e) {
        console.error(`[getMissionClients] ${e}`);
    }
}

export async function updateClient(clientId: string, clientData: ClientFormType) {
    try {
        prisma.client.update({
            where: { id: clientId },
            data: {
                job: clientData.job,
                person: {
                    update: {
                        firstName: clientData.firstName,
                        lastName: clientData.lastName,
                        email: clientData.email,
                        number: clientData.number,
                        address: {
                            update: {
                                number: clientData.address?.number,
                                street: clientData.address?.street,
                                city: clientData.address?.city,
                                country: clientData.address?.country,
                                zipCode: clientData.address?.zipCode,
                            },
                        },
                    },
                },
            },
        });
    } catch (e) {
        console.error(`[updateClient] ${e}`);
    }
}

export async function addClient(studyId: string, clientData: ClientFormType) {
    try {
        let address = {};
        if (clientData.address) {
            address = {
                create: {
                    number: clientData.address?.number,
                    street: clientData.address?.street,
                    city: clientData.address?.city,
                    country: clientData.address?.country,
                    zipCode: clientData.address?.zipCode,
                },
            };
        }
        prisma.study.update({
            where: { id: studyId },
            data: {
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
                                        address,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    } catch (e) {
        console.error(`[addClient] ${e}`);
    }
}

export async function removeClient(studyId: string, studyClientId: string) {
    try {
        prisma.studyClient.delete({ where: { id: studyClientId } });
    } catch (e) {
        console.error(`[removeClient] ${e}`);
    }
}
