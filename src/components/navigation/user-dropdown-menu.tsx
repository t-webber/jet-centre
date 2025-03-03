'use client';

import { UserAvatar } from '@/components/ui/user-avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

interface UserDropdownMenuProps {
    isMobile: boolean;
    isOpen: boolean;
}

export const UserDropdownMenu = ({ isMobile, isOpen }: UserDropdownMenuProps) => {
    const session = useSession();
    const avatarUrl = session.data?.user.image ?? null;
    const username = session.data?.user.name ?? null;
    const [open, setOpen] = useState(false);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full justify-between"
                        >
                            {isOpen && <span className="font-medium">{username}</span>}
                            <UserAvatar round={isOpen} avatarUrl={avatarUrl} />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <UserAvatar avatarUrl={avatarUrl} />
                                {isOpen && <span className="font-medium">{username}</span>}
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="space-x-2">
                                <BadgeCheck />
                                <p>Account</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="space-x-2">
                                <CreditCard />
                                <p>Billing</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="space-x-2">
                                <Bell />
                                <p>Notifications</p>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="space-x-2" onClick={() => signOut()}>
                            <LogOut />
                            <p>Log out</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};
