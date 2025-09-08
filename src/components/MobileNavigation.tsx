'use client';

import Image from 'next/image';

interface NavigationItem {
    id: string;
    label: string;
    href: string;
}

interface MobileNavigationProps {
    items: NavigationItem[];
    projectsCount?: number;
    onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
    activeSection?: string;
}

export default function MobileNavigation({ items, projectsCount = 0, onItemClick, activeSection }: MobileNavigationProps) {
    // Разделяем элементы на проекты и "О нас / контакты"
    const projectItems = items.slice(0, projectsCount);
    const aboutItem = items.find(item => item.href === '#about');

    return (
        <div className="flex flex-col h-full mt-20 max-h-[calc(100vh-80px)]">
            {/* Скроллируемая часть с проектами */}
            <div className="flex-1 overflow-y-auto min-h-0 hide-scrollbar w-[95vw] scroll-smooth [scroll-snap-type:y_mandatory]">
                <nav className="mb-4">
                    <ul className="flex flex-col gap-2 mt-10 mb-10">
                        {projectItems.map((item) => {
                            const itemId = item.href.replace('#', '');
                            const isActive = activeSection === itemId;

                            return (
                                <li key={itemId} className="[scroll-snap-align:start]">
                                    <div className="flex items-center gap-3 ml-4">
                                        <div className="w-1 h-1">
                                            {isActive && (
                                                <div className="w-1 h-1 rounded-full bg-[#141414]" />
                                            )}
                                        </div>
                                        <a
                                            href={item.href}
                                            onClick={(e) => onItemClick(e, item.href)}
                                            className={`
                                                font-[700]
                                                text-[12px]
                                                leading-[20px]        
                                                [letter-spacing:0em]
                                                [word-spacing:0.3em]              
                                                uppercase
                                                font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial']
                                                transition-all duration-200 text-[#141414]  cursor-pointer
                                              `}
                                        >
                                            {item.label}
                                            <span className="text-[#141414][letter-spacing: 0em] ml-1 font-[300] text-[12px]" style={{
                                                fontWeight: "Triple Regular",
                                                textTransform: "uppercase",
                                                letterSpacing: "-0.7px"
                                            }}>&apos;24</span>
                                        </a>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* Фиксированная часть внизу - "О нас / контакты" */}
            {aboutItem && (
                <div className="flex-shrink-0 pb-20">
                    <div className="mb-2 mt-2 ml-8 w-[85vw] border-b-[1px] border-[#14141433]">
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                        <div className="w-1 h-1">
                            {activeSection === 'about' && (
                                <div className="w-1 h-1 rounded-full bg-[#141414]" />
                            )}
                        </div>
                        <a
                            href={aboutItem.href}
                            onClick={(e) => onItemClick(e, aboutItem.href)}
                            className={`
                                font-[700]
                                text-[12px]
                                leading-[20px]        
                                [letter-spacing:0em]
                                [word-spacing:0.3em]              
                                uppercase
                                font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial']
                                transition-all duration-200 text-[#141414]  cursor-pointer
                              `}
                        >
                            {aboutItem.label}
                            <Image
                                src="/Vector.svg"
                                alt="Vector"
                                width={12}
                                height={12}
                                className="ml-1 inline align-middle"
                            />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
