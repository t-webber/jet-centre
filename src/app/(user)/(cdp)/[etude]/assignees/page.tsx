import ClientAssignees from './client';

export interface Assignee {
    firstname: string;
    lastname: string;
    email: string;
    experience: string;
    knowledge: string;
    ideas: string;
    je_experience: string;
    cv_path: string;
    entretien: object;
}

const assignees: Assignee[] = [
    {
        firstname: 'zemlrkdjf',
        lastname: 'zemlrkdjf',
        email: 'zemlrkdjf',
        experience: 'zemlrkdjf',
        knowledge: 'zemlrkdjf',
        ideas: 'zemlrkdjf',
        je_experience: 'zemlrkdjf',
        cv_path: 'zemlrkdjf',
        entretien: {},
    },
];

export default function Assignees({ children }: { children: string }) {
    return (
        <div className="flex space-x-main">
            <ClientAssignees assignees={assignees} />
        </div>
    );
}
