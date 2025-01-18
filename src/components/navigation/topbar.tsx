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

export const TopBar = () => {
    return (
        <div className="flex w-full items-center">
            <div className="flex-1"></div>
            <div>
                <Search />
            </div>
            <div className="flex-1 flex justify-end text-primary">
                <Button variant="underline" className=" items-center space-x-2 flex">
                    <FaBug />
                    <Button variant="underline" asChild>
                        <Link href="/ticket" className="font-semi">
                            Ticket SOS
                        </Link>
                    </Button>
                </Button>
            </div>
        </div>
    );
};
