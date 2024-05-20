import Image from 'next/image';
import logoBird from '@/../public/bird_logo_full.svg';

const LogoBird = () => {
    return <Image priority src={logoBird} alt="Logo de Telecom Etude" className="size-12" />;
};

export default LogoBird;
