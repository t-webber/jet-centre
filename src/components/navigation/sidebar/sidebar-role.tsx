import sidebar_all from '@/settings/sidebars/sidebar-all';
import { SidebarList } from './sidebar-list';

export default function SidebarRole() {
    const sidebar_groups = sidebar_all.trez;

    return <SidebarList sidebar_groups={sidebar_groups} />;
}
