import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { SideBarGroups } from '@/settings/sidebars/siderbar-trez';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '../ui/sidebar';

export const NavigationTemplate = ({ sidebar_groups }: { sidebar_groups: SideBarGroups[] }) => (
    <NavigationMenu className="flex flex-col max-w-none items-start space-y-main">
        {sidebar_groups.map((sidebar_group, i) => (
            <SidebarGroup key={sidebar_group.title}>
                <SidebarGroupLabel>{sidebar_group.title}</SidebarGroupLabel>
                <SidebarMenu>
                    {sidebar_group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>

            // <React.Fragment key={i}>
            //     {i ? <Separator /> : null}
            //     <NavigationMenuList key={i} className="flex flex-col items-start">
            //         {sidebar_group.items.map((item, i) => (
            //             <NavigationMenuItem key={i}>
            //                 <Button asChild variant="underline" className="text-foreground">
            //                     <NavigationMenuLink href={item.href}>
            //                         {item.title}
            //                     </NavigationMenuLink>
            //                 </Button>
            //             </NavigationMenuItem>
            //         ))}
            //     </NavigationMenuList>
            // </React.Fragment>
        ))}
    </NavigationMenu>
);
