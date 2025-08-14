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
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        const handleResize = () => {
            setIsMobile(mediaQuery.matches);
            setIsLoaded(true);
        };

        handleResize(); // Initial check

        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    if (!isLoaded) {
        return null; // Показываем пустой экран до определения устройства
    }

    return <>{isMobile ? mobile : desktop}</>;
}
