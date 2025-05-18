'use server';

import { Address, Company, CompanyInfos } from '@prisma/client';

import prisma from '@/db';
import { dbg } from '@/lib/utils';

import { AddressType, ClientFormType, CompanyType, StudyClientsFormType } from './schema';

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
        return {
            clients: study.clients.map(({ id, client }) => {
                let clientAddress: AddressType | undefined;
                if (client.person.address) {
                    clientAddress = {
                        number: client.person.address.streetNumber,
                        street: client.person.address.streetName,
                        city: client.person.address.city,
                        country: client.person.address.country,
                        zipCode: client.person.address.zipCode,
                    };
                }
                let company: CompanyType | undefined;
                if (client.company) {
                    let companyAddress: AddressType | undefined;
                    if (client.company.address) {
                        companyAddress = {
                            number: client.company.address.streetNumber,
                            street: client.company.address.streetName,
                            city: client.company.address.city,
                            country: client.company.address.country,
                            zipCode: client.company.address.zipCode,
                        };
                    }
                    company = {
                        address: companyAddress,
                        name: client.company.name,
                        size: client.company.companyInfos.size ?? undefined,
                        ca: client.company.companyInfos.ca ?? undefined,
                        domains: client.company.companyInfos.domains,
                        id: client.company.companyInfos.id,
                    };
                }
                return {
                    studyClientId: id,
                    clientId: client.id,
                    job: client.job,
                    firstName: client.person.firstName,
                    lastName: client.person.lastName,
                    email: client.person.email ?? undefined,
                    address: clientAddress,
                    number: client.person.number ?? undefined,
                    company,
                } satisfies ClientFormType;
            }),
            studyId: study.id,
        };
    } catch (e) {
        console.error(`[getMissionClients] ${e}`);
    }
}

type IdlessAddressInfos = Omit<Address, 'id'>;
type IdlessCompanyInfos = Omit<CompanyInfos, 'id'>;
type IdlessAllCompany = Omit<Company, 'id' | 'companyInfosId' | 'addressId'>;

type IdlessAddressUpsert =
    | { update: IdlessAddressInfos }
    | { create: IdlessAddressInfos }
    | undefined;

export async function updateClient(clientId: string, clientData: ClientFormType) {
    try {
        let clientAddress: { update: Omit<Address, 'id'> } | undefined;

        if (clientData.address) {
            clientAddress = {
                update: {
                    streetNumber: clientData.address?.number,
                    streetName: clientData.address?.street,
                    city: clientData.address?.city,
                    country: clientData.address?.country,
                    zipCode: clientData.address?.zipCode,
                },
            };
        }

        let companyAddress: IdlessAddressUpsert;

        if (clientData.company?.address) {
            if (clientData.company.address.id) {
                companyAddress = {
                    update: {
                        streetNumber: clientData.company.address?.number,
                        streetName: clientData.company.address?.street,
                        city: clientData.company.address?.city,
                        country: clientData.company.address?.country,
                        zipCode: clientData.company.address?.zipCode,
                    },
                };
            } else
                companyAddress = {
                    create: {
                        streetNumber: clientData.company.address?.number,
                        streetName: clientData.company.address?.street,
                        city: clientData.company.address?.city,
                        country: clientData.company.address?.country,
                        zipCode: clientData.company.address?.zipCode,
                    },
                };
        }

        let company:
            | {
                  update: {
                      where: { id: string };
                      data: IdlessAllCompany & {
                          companyInfos: { update: IdlessCompanyInfos };
                          address: IdlessAddressUpsert;
                      };
                  };
              }
            | {
                  create: IdlessAllCompany & {
                      companyInfos: { create: IdlessCompanyInfos };
                      address: { create: IdlessAddressInfos };
                  };
              }
            | undefined;

        if (clientData.company?.id) {
            company = {
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
                        address: companyAddress,
                    },
                },
            };
        } else if (clientData.company) {
            if (clientData.address?.id !== undefined)
                throw new Error(
                    "Address id defined but company id undefined: can't updated address for non-created company."
                );

            company = {
                create: {
                    name: clientData.company.name,
                    companyInfos: {
                        create: {
                            size: clientData.company.size ?? null,
                            ca: clientData.company.ca ?? null,
                            domains: clientData.company.domains,
                        },
                    },
                    address: companyAddress as { create: IdlessAddressInfos },
                },
            };
        }

        await prisma.client.update({
            where: { id: clientId },
            data: {
                job: clientData.job,
                person: {
                    update: {
                        firstName: clientData.firstName,
                        lastName: clientData.lastName,
                        email: clientData.email,
                        number: clientData.number,
                        address: clientAddress,
                    },
                },
                company,
            },
        });
    } catch (e) {
        console.error(`[updateClient] ${e}`);
    }
}

export async function addClient(studyId: string, clientData: ClientFormType) {
    try {
        dbg(clientData, `adding data for ${studyId}`);
        let address: { create: Omit<Address, 'id'> } | undefined;
        if (clientData.address) {
            address = {
                create: {
                    streetNumber: clientData.address?.number,
                    streetName: clientData.address?.street,
                    city: clientData.address?.city,
                    country: clientData.address?.country,
                    zipCode: clientData.address?.zipCode,
                },
            };
        }
        let connectCompany: { connect: { id: string } } | undefined;
        if (clientData.company) {
            dbg(clientData.company, 'haha company');
            const company = await prisma.company.update({
                where: { id: clientData.company.id },
                data: {
                    name: clientData.company?.name,
                    address: {
                        update: {
                            streetNumber: clientData.company?.address?.number,
                            streetName: clientData.company?.address?.street,
                            city: clientData.company?.address?.city,
                            country: clientData.company?.address?.country,
                            zipCode: clientData.company?.address?.zipCode,
                        },
                    },
                    companyInfos: {
                        create: {
                            domains: clientData.company?.domains,
                            size: clientData.company?.size,
                            ca: clientData.company?.ca,
                        },
                    },
                },
            });
            connectCompany = {
                connect: {
                    id: company.id,
                },
            };
        }
        await prisma.study.update({
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
                                company: connectCompany,
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

export async function removeClient(studyClientId: string) {
    try {
        await prisma.studyClient.delete({ where: { id: studyClientId } });
    } catch (e) {
        console.error(`[removeClient] ${e}`);
    }
}
