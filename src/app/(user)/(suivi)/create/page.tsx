import { ContactFormValue } from './forms/contactSchema';
import Inner from './inner';
import prisma from '@/db';

export default async function CreateStudy() {
    const rawContact = await prisma.clients.findMany({
        select: {
            id: true,
            person: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });

    const contacts: ContactFormValue[] = rawContact.map((c) => ({
        id: c.id,
        firstName: c.person.firstName,
        lastName: c.person.lastName
    }));
    return (
        <>
            <Inner contacts={contacts} />
        </>
    );
}
