import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export const UserAvatar = ({ round }: { round?: boolean }) => {
    return (
        <Avatar className={cn('h-8 w-8 rounded-lg', round ? 'rounded-full' : '')}>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
            <AvatarFallback className={cn('rounded-lg', round ? 'rounded-full' : '')}>
                A
            </AvatarFallback>
        </Avatar>
        // <Avatar>
        //     <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" width={8} />
        //     <AvatarFallback className="">A</AvatarFallback>
        // </Avatar>
    );
};
