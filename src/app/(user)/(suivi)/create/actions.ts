'use server';

import prisma from '@/db';
import { studyCreationSchema, StudyCreationSchema } from './forms/schema';
import { NotifLvl, StudyProgressStep } from '@prisma/client';
import { ROLE_NAME_CDP } from '@/settings/roles';
import { NewAdmin } from './forms/settingsSchema';

export async function onSubmit(jsonData: string) {
    const data_ = JSON.parse(jsonData);
    const data: StudyCreationSchema = studyCreationSchema.parse(data_);

    console.log('submit ----------------------------------------------------');
    console.log(data_);
    console.log(data);

    // TODO:
    // - domain for study
    // - CompanyInfo

    // fix: Le cas où le référent est un nouveau admin et est aussi un cdp

    const cdpRole = await prisma.roles.findUnique({
        where: {
            name: ROLE_NAME_CDP
        }
    });

    if (!cdpRole) {
        throw new Error("'cdp' role not found");
    }

    const [adminsCdPId, clientsId] = await createAndGetHumainIds(data, cdpRole!.id);

    const studyDuration =
        typeof data.settings.duration === 'number' ? (data.settings.duration as number) : undefined;

    await prisma.studies.create({
        data: {
            // referent: {
            //     connect: {
            //         id: referentId
            //     }
            // },
            cdps: {
                connect: adminsCdPId.map((id) => ({ id }))
            },
            clients: {
                createMany: {
                    data: clientsId.map((id) => ({
                        clientId: id
                    }))
                }
            },
            information: {
                create: {
                    title: data.settings.name,
                    applicationFee: 0,
                    duration: studyDuration,
                    deadlinePreStudy: new Date(data.settings.deadline),
                    cc: data.settings.cc
                }
            },
            progress: {
                create: {
                    step: StudyProgressStep.PRELIMINARY_STUDY
                }
            }
        }
    });
}

async function createAndGetHumainIds(
    data: StudyCreationSchema,
    cdpRoleId: string
): Promise<[string[], string[]]> {
    const adminsCdPId = await Promise.all(
        data.settings.cdps.map(async (cdp) => {
            if ('isNew' in cdp) {
                return (await prisma.admins.create(cdpData(cdp, cdpRoleId))).id;
            } else {
                return cdp.id;
            }
        })
    );

    // const referentId =
    //     'isNew' in data.settings.referent
    //         ? (await prisma.admins.create(cdpData(data.settings.referent, cdpRoleId))).id
    //         : data.settings.referent.id;

    const company = await prisma.companies.create({
        data: {
            companyInfos: {},
            name: data.company.name,
            address: {
                create: {
                    number: data.company.address.number,
                    street: data.company.address.street,
                    city: data.company.address.city,
                    zipCode: data.company.address.zip,
                    country: data.company.address.country
                }
            }
        }
    });

    const clientsId = await Promise.all(
        data.contact.contact.map(async (c) => {
            prisma.studyClients.create;

            if ('isNew' in c) {
                return (
                    await prisma.clients.create({
                        data: {
                            company: {
                                connect: {
                                    id: company.id
                                }
                            },
                            person: {
                                create: {
                                    firstName: c.firstName,
                                    lastName: c.lastName,
                                    email: c.email,
                                    number: c.tel
                                }
                            },
                            job: c.job
                        }
                    })
                ).id;
            } else {
                return c.id;
            }
        })
    );

    return [adminsCdPId, clientsId];
}

function cdpData(cdp: NewAdmin, cdpRoleId: string) {
    return {
        data: {
            user: {
                create: {
                    person: {
                        create: {
                            email: cdp.email,
                            firstName: cdp.firstName,
                            lastName: cdp.lastName,
                            number: cdp.tel
                        }
                    },
                    settings: {
                        create: {
                            theme: 'dark',
                            notificationLvl: NotifLvl.HIGH,
                            gui: true
                        }
                    }
                }
            },
            role: {
                connect: {
                    id: cdpRoleId
                }
            }
        }
    };
}
