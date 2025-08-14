'use client';

import Image from 'next/image';

interface MobileLogoProps {
    onLogoClick?: () => void;
    onClose: () => void;
}

export default function MobileLogo({ onLogoClick, onClose }: MobileLogoProps) {
    return (
        <Image 
            src="/MOSCOW.svg" 
            alt="logo" 
            width={180} 
            height={180}
            onClick={() => {
                onClose();
                if (onLogoClick) {
                    onLogoClick();
                }
            }}
            className="cursor-pointer m-4"
        />
    );
}
