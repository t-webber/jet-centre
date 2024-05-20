import NavBar from '@/components/ui/navbar';
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
                <ResizablePanel minSize={10} maxSize={20} defaultSize={10}>
                    <NavBar />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>{children}</ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default Layout;
