import { LogoBirdText } from '../logo';
import { Button } from '@/components/ui/button';
import { NavbarContent } from './navbar-content';

const NavBar = () => {
    return (
        <div className="h-screen flex flex-col items-center p-main bg-box-background">
            <LogoBirdText />
            <div className="flex-grow flex flex-col">
                <NavbarContent missions={['223072', '223073', '223074']} position="Respo Info" />
            </div>
            <Button variant="outline" className="w-full bg-transparent">
                <span>Nicolas Glady</span>
            </Button>
        </div>
    );
};

export default NavBar;
