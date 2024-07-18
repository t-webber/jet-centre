import Link from 'next/link';
import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const Box = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string | string[];
}) => <div className={cn('rounded-xl bg-box-background flex flex-col', className)}>{children}</div>;

export const BoxHeader = ({ children }: { children?: ReactNode }) => (
    <div className="bg-box-title flex justify-between items-center p-2">{children}</div>
);

export const BoxContent = ({ children, fill = false }: { children: ReactNode; fill?: boolean }) => (
    <div className={cn('p-2 overflow-y-auto max-h-[calc(100vh-144px)]', fill && 'h-full')}>
        {children}
    </div>
);

export const BoxLink = ({ children, href }: { children: string | string[]; href: string }) => (
    <Button variant="link" className="px-0 py-0 h-fit text-link">
        <Link href={href}>{children}</Link>
    </Button>
);

export const BoxTitle = ({ children }: { children: string | string[] }) => (
    <h2 className="font-semibold text-lg">{children}</h2>
);
