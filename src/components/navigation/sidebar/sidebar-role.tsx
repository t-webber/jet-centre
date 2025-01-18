import sidebar_all from '@/settings/sidebars/sidebar-all';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';

export default function SidebarRole() {
    const sidebar_content = sidebar_all.trez;

    return (
        <div>
            {sidebar_content.map((sidebar_group) => (
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
            ))}
        </div>
    );
}
