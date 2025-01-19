import { FaBug } from 'react-icons/fa';
import { Button } from '../ui/button';
import { Search } from './search';
import Link from 'next/link';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '../ui/sidebar';

export const TopBar = () => {
    return (
        <div className="flex w-full items-center">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1"></div>
            <div className="">
                <Search />
            </div>
            <div className="flex-1"></div>
            <Button variant="underline" className=" items-center space-x-2 flex p-0">
                <FaBug />
                <Button variant="underline" asChild className="font-semi p-0">
                    <Link href="/ticket">Ticket SOS</Link>
                </Button>
            </Button>
        </div>
    );
};
