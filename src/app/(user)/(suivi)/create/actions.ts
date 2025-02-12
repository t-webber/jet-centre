'use server';

import prisma from '@/db';
import { studyCreationSchema, StudyCreationSchema } from './forms/schema';
import { NotifLvl, StudyProgressStep } from '@prisma/client';
import { ROLE_NAME_CDP } from '@/settings/roles';
import { NewAdmin } from './forms/settings/settingsSchema';
import { CompanySize, Domain, toPgCompanySize, toPgDomain } from '@/settings/vars';

export async function onSubmit(jsonData: string) {
    const data_ = JSON.parse(jsonData);
    const data: StudyCreationSchema = studyCreationSchema.parse(data_);

    const cdpRole = await prisma.roles.findUnique({
        where: {
            name: ROLE_NAME_CDP
        }
    });

    if (!cdpRole) {
        throw new Error("'cdp' role not found");
    }

    const falseId = Math.random().toString().repeat(5);

    const cdps = await Promise.all(
        data.settings.cdps.map(async (cdp) => {
            const person = await prisma.people.findUnique({
                where: {
                    email: cdp.email
                },
                select: {
                    User: true
                }
            });
            return { userId: person?.User?.id ?? falseId, ...cdp };
        })
    );

    const companies_ = await Promise.all(
        data.companies.companies.map(async (company) => {
            if (!company) return null;

            const members = await Promise.all(
                company.members.map(async (member) => {
                    const person = await prisma.people.findUnique({
                        where: {
                            email: member.email
                        }
                    });
                    return { peopleId: person?.id ?? falseId, ...member };
                })
            );

            return { ...company, members };
        })
    );
    const companies = companies_.filter((c) => c !== null);

    await prisma.studies.create({
        data: {
            cdps: {
                connectOrCreate: cdps.map((cdp) => ({
                    where: {
                        userId: cdp.userId
                    },
                    create: {
                        role: {
                            connect: {
                                id: cdpRole.id
                            }
                        },
                        user: {
                            create: {
                                person: {
                                    create: {
                                        email: cdp.email,
                                        firstName: cdp.firstName,
                                        lastName: cdp.lastName,
                                        // If we don't connect, that mean we have a new user
                                        number: orUndefine((cdp as NewAdmin).tel)
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
                        }
                    }
                }))
            },
            clients: {
                create: companies
                    .map((company) => {
                        return company.members
                            .filter((member) => !(member.excluded ?? false))
                            .map((member) => ({
                                client: {
                                    connectOrCreate: {
                                        where: {
                                            peopleId: member.peopleId
                                        },
                                        create: {
                                            job: member.job,
                                            person: {
                                                create: {
                                                    email: member.email,
                                                    firstName: member.firstName,
                                                    lastName: member.lastName,
                                                    number: ''
                                                }
                                            },
                                            company: {
                                                connectOrCreate: {
                                                    where: {
                                                        name: company.name
                                                    },
                                                    create: {
                                                        name: company.name,
                                                        address: {
                                                            create: {
                                                                number: company.address.number,
                                                                street: company.address.street,
                                                                city: company.address.city,
                                                                zipCode: company.address.zip,
                                                                country: company.address.country
                                                            }
                                                        },
                                                        companyInfos: {
                                                            create: {
                                                                nvEmployees: 0,
                                                                ca: orUndefine(company.ca),
                                                                size: map(
                                                                    orUndefine(
                                                                        company.size
                                                                    ) as CompanySize,
                                                                    toPgCompanySize
                                                                ),
                                                                domains: !isEmtpyString(
                                                                    company.domains
                                                                )
                                                                    ? (
                                                                          company.domains as Domain[]
                                                                      ).map(toPgDomain)
                                                                    : []
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }));
                    })
                    .flat()
            },
            information: {
                create: {
                    title: data.settings.name,
                    // applicationFee: 0,
                    duration: orUndefine(data.settings.duration),
                    // deadlinePreStudy: new Date(data.settings.deadline),
                    deadlinePreStudy: map(orUndefine(data.settings.deadline), (x) => new Date(x)),
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

function isEmtpyString<T>(value: T): boolean {
    return typeof value === 'string' && value === '';
}

function orUndefine<T>(value: T | string | null | undefined): T | undefined {
    return value === null || value === undefined || (typeof value === 'string' && value === '')
        ? undefined
        : (value as T);
}

function map<T, V>(x: T | undefined, callback?: (x: T) => V): V | undefined {
    return x === undefined ? undefined : callback!(x as T);
}
