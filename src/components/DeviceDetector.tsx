'use client';

import { useEffect, useState } from 'react';

export default function DeviceDetector({
    desktop,
    mobile,
    projectsData,
}: {
    desktop: React.ReactNode;
    mobile: React.ReactNode;
    projectsData: any[];
}) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 450);
        };

        checkIfMobile();

        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    if (isMobile) {
        return <>{mobile}</>;
    }

    return <>{desktop}</>;
}