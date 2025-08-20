'use client';

import MobileNavigation from './MobileNavigation';

interface NavigationItem {
    id: string;
    label: string;
    href: string;
}

interface MobileMenuProps {
    items: NavigationItem[];
    projectsCount?: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ items, projectsCount = 0, isOpen, onClose }: MobileMenuProps) {
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
        <div className="fixed inset-0 bg-black dark:bg-white bg-opacity-90 dark:bg-opacity-90 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-black text-black dark:text-white w-full h-full flex flex-col">
                {/* Навигация */}
                <div className="flex-1  flex flex-col">
                    <nav className="flex flex-col h-full">
                        <div
                            className="cursor-pointer font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial'] font-[800] text-[12px]  leading-[12px] align-bottom
                
                
                            fixed top-0 left-0 right-0 z-19 p-4 bg-[var(--background)] text-[var(--foreground)]"
                           style={{
                               fontStyle: 'Triple Bold',
                               letterSpacing: '0%',
                               verticalAlign: 'bottom'
                           }}
                            onClick={() => {
                                const mainElement = document.querySelector('main');
                                if (mainElement) {
                                    mainElement.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                }
                                onClose();
                            }}
                        >
                            COMPANY MOSCOW
                        </div>
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
