import { FaPlus } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import { Button } from './ui/button';

interface ButtonProps {
    onClick: () => void;
}

interface AddButtonProps extends ButtonProps {
    text: string;
}

export function AddButton({ onClick, text }: AddButtonProps) {
    return (
        <Button variant="outline" className="m-auto flex items-center gap-main" onClick={onClick}>
            <p>{text}</p>
            <FaPlus />
        </Button>
    );
}

interface IconButtonProps extends ButtonProps {
    Icon: IconType;
    hoverContent?: string;
}

export const IconButton = ({ onClick, Icon, hoverContent }: IconButtonProps) => {
    const button = (
        <Button onClick={onClick} variant="ghost">
            <Icon className="p-1 w-6 h-6" />
        </Button>
    );

    return hoverContent ? (
        <HoverCard>
            <HoverCardTrigger>{button}</HoverCardTrigger>
            <HoverCardContent className="w-fit">{hoverContent}</HoverCardContent>
        </HoverCard>
    ) : (
        button
    );
};
