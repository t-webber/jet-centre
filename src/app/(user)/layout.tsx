import NavBar from '@/components/navigation/navbar';
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
                <ResizablePanel minSize={10} maxSize={20} defaultSize={1}>
                    <NavBar />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={8}>{children}</ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default Layout;
