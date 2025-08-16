'use client';

interface NavigationItem {
    id: string;
    label: string;
    href: string;
}

interface MobileNavigationProps {
    items: NavigationItem[];
    projectsCount?: number;
    onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export default function MobileNavigation({ items, projectsCount = 0, onItemClick }: MobileNavigationProps) {
    return (
        <div className="flex-1 overflow-y-auto min-h-0 max-h-[90vh] hide-scrollbar">
            <nav className="mb-4">
                <ul className="flex flex-col gap-2 mt-10 mb-10">
                    {items.map((item, index) => {
                        const itemId = item.href.replace('#', '');
                        
                        return (
                            <li key={itemId}>
                                {index === projectsCount && (
                                    <div className="mb-2 mt-6">
                                        <p className="text-[8px] uppercase font-bold text-[#838383] indent-4">ПРОЕКТЫ</p>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-1" />
                                    <a 
                                        href={item.href}
                                        onClick={(e) => onItemClick(e, item.href)}
                                        className={`transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[700] text-[14px] uppercase cursor-pointer text-[#141414] dark:text-white ml-1`}
                                    >
                                        {item.label} <span className="text-[#A6A6A6] ml-3">2024</span>
                                    </a>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
