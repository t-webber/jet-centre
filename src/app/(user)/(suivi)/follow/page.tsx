import { Box, BoxContent, BoxHeader, BoxLink, BoxTitle } from '@/components/boxes/boxes';
import { Task, TaskBulletList } from '@/components/meta-components/task-bullet-list';
import { Metadata } from 'next';
import { FollowMissionTaskList } from './client';

export const metadata: Metadata = {
    title: 'Suivi'
};

export default function Page() {
    return (
        <div>
            <Box className="w-full">
                <BoxHeader>
                    <BoxTitle>Checklist du CDP</BoxTitle>
                    {/* <BoxLink href="/examples">Voir des exemples</BoxLink> */}
                </BoxHeader>
                <BoxContent>
                    <FollowMissionTaskList initialList={getTasks()} />
                </BoxContent>
            </Box>
        </div>
    );
}

function getTasks(): Task[] {
    return [
        {
            id: '1',
            name: 'Buy groceries',
            date: new Date('2025-01-20'),
            checked: false
        },
        {
            id: '2',
            name: 'Complete Rust tutorial',
            date: new Date('2025-01-21'),
            checked: true
        },
        {
            id: '3',
            name: 'Fix bugs in C compiler',
            date: new Date('2025-01-22'),
            checked: false
        },
        {
            id: '4',
            name: 'Prepare internship application',
            date: new Date('2025-01-23'),
            checked: false
        },
        {
            id: '5',
            name: 'Read about asynchronous programming',
            date: new Date('2025-01-24'),
            checked: true
        },
        {
            id: '6',
            name: 'Design database schema for chat service',
            date: new Date('2025-01-25'),
            checked: false
        },
        {
            id: '7',
            name: 'Optimize CRM-ERP performance',
            date: new Date('2025-01-26'),
            checked: false
        },
        {
            id: '8',
            name: 'Plan regional congress presentation',
            date: new Date('2025-01-27'),
            checked: true
        },
        {
            id: '9',
            name: 'Test multithreading in embedded systems',
            date: new Date('2025-01-28'),
            checked: false
        },
        {
            id: '10',
            name: 'Learn about algebraic curves',
            date: new Date('2025-01-29'),
            checked: false
        }
    ];
}
