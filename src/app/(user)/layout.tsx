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
        <div className="flex flex-row h-full">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel minSize={15} maxSize={30} defaultSize={1}>
                    <NavBar />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={8}>
                    <div className="flex flex-col p-10 space-y-10 h-full overflow-auto">
                        <TopBar />
                        {children}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default Layout;
