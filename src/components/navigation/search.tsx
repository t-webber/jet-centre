import { Input } from '../ui/input';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export const Search = () => {
    return (
        <div className="bg-box-title rounded-full flex items-center">
            <Input
                className="bg-transparent w-fit border-none rounded-full"
                placeholder="Rechercher..."
                id="search"
            />
            <FaMagnifyingGlass className="m-2" />
        </div>
    );
};
