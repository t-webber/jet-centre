'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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

interface UserDropdownMenuProps {
    username: string;
    isMobile: boolean;
    isOpen: boolean;
}

export const UserDropdownMenu = ({ username, isMobile, isOpen }: UserDropdownMenuProps) => {
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
                            <UserAvatar round={isOpen} />
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
                                <UserAvatar />
                                {isOpen && <span className="font-medium">{username}</span>}
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="space-x-2">
                                <Sparkles />
                                <p>Upgrade to Pro</p>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
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
                        <DropdownMenuItem className="space-x-2">
                            <LogOut />
                            <p>Log out</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <div className="place-items-center text-center flex">
                {!isOpen && (
                    <DropdownMenuTrigger>
                        <UserAvatar />
                    </DropdownMenuTrigger>
                )}
                {isOpen && (
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            className="w-full justify-between rounded-lg hover:bg-accent h-auto"
                        >
                            <span className="font-medium">{username}</span>
                            <UserAvatar />
                        </Button>
                    </DropdownMenuTrigger>
                )}
                <DropdownMenuContent
                    align="start"
                    className="w-[--radix-popper-anchor-width] bg-background rounded-lg p-0 flex flex-col [&>*]:px-2 [&>*]:py-1"
                    sideOffset={8}
                >
                    <Button
                        variant="ghost"
                        className="w-full text-left justify-start rounded-none"
                        onClick={() => setOpen(false)}
                    >
                        Profile
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full text-left justify-start rounded-none"
                        onClick={() => setOpen(false)}
                    >
                        Settings
                    </Button>
                    <Button
                        variant="destructive"
                        className="w-full text-left justify-start rounded-none"
                        onClick={() => setOpen(false)}
                    >
                        Log out
                    </Button>
                </DropdownMenuContent>
            </div>
        </DropdownMenu>
    );
};
