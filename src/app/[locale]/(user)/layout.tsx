import NavBar from '@/components/ui/navbar';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex flex-row">
            <NavBar />
            {children}
        </div>
    );
};

export default Layout;
