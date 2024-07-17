import { LogoBirdText } from '../logo';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { NavbarContent } from './navbar-content';

const NavBar = () => {
    return (
        <div className="relative p-main bg-box-background h-full flex flex-col items-center space-y-main">
            <div className="flex-1 w-full flex flex-col items-center ">
                <LogoBirdText />
                <NavbarContent missions={['223072', '223073', '223074']} position="Respo Info" />
            </div>
            <Separator />
            <Button variant="outline" className="w-full">
                <span>Nicolas Glady</span>
            </Button>
        </div>
    );
};

export default NavBar;
