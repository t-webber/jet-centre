import { FaPlus } from 'react-icons/fa6';

import { Button } from './ui/button';

export function AddButton({ onClick, text }: { text: string; onClick: () => void }) {
    return (
        <Button variant="outline" className="m-auto flex items-center gap-main" onClick={onClick}>
            <p>{text}</p>
            <FaPlus />
        </Button>
    );
}
