'use client';

import { useEffect, useState } from 'react';

export default function DeviceDetector({
    desktop,
    mobile,
}: {
    desktop: React.ReactNode;
    mobile: React.ReactNode;
}) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        const handleResize = () => {
            setIsMobile(mediaQuery.matches);
        };

        handleResize(); // Initial check

        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    return <>{isMobile ? mobile : desktop}</>;
}
