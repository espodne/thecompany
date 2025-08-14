'use client';

import MobileLogo from './MobileLogo';
import MobileNavigation from './MobileNavigation';

interface NavigationItem {
    id: string;
    label: string;
    href: string;
}

interface MobileMenuProps {
    items: NavigationItem[];
    projectsCount?: number;
    onLogoClick?: () => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ items, projectsCount = 0, onLogoClick, isOpen, onClose }: MobileMenuProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        onClose();
        
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="bg-white w-full h-full flex flex-col">
                {/* Навигация */}
                <div className="flex-1  flex flex-col">
                    <nav className="flex flex-col h-full">
                        <MobileLogo onLogoClick={onLogoClick} onClose={onClose} />
                        <MobileNavigation 
                            items={items}
                            projectsCount={projectsCount}
                            onItemClick={handleClick}
                        />
                    </nav>
                </div>
            </div>
        </div>
    );
}
