import { LogoBird } from '../../logo';

export const NavbarHeader = () => {
    return (
        <a href="/" className="flex items-center gap-3 px-2">
            <LogoBird />
            <div className="flex flex-col">
                <h1 className="font-semibold text-lg">JET&nbsp;CENTER</h1>
                <p className="text-sm text-muted-foreground">Telecom Etude</p>
            </div>
        </a>
    );
};
