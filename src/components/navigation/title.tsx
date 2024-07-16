'use client';

import { useEffect, useState } from 'react';

export const Title = () => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(document?.title || '');
    }, []);

    return <>{title}</>;
};
