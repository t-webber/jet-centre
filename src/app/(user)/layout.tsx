import NavBar from '@/components/navigation/navbar';
import { TopBar } from '@/components/navigation/topbar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import React from 'react';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex h-full">
            <NavBar />
            <div className="flex flex-col p-10 space-y-10 w-full">
                <TopBar />
                {children}
            </div>
        </div>
    );
};

export default Layout;
