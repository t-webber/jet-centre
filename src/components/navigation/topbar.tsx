import { FaBug } from 'react-icons/fa';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Title } from './title';
import { Search } from './search';

export const TopBar = () => {
    return (
        <div className="flex w-full items-center">
            <div className="flex-1">
                <p className="text-primary font-semi">
                    <Title />
                </p>
            </div>
            <div>
                <Search />
            </div>
            <div className="flex-1 flex justify-end">
                <Button variant="underline" className=" items-center space-x-2 flex">
                    <FaBug />
                    <p className="font-semi">Ticket SOS</p>
                </Button>
            </div>
        </div>
    );
};
