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
        <div className="flex-1 overflow-y-auto mt-20 min-h-0 max-h-[90vh] hide-scrollbar">
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
                                        className={`
                                            font-[700]
                                            text-[12px]
                                            leading-[20px]                     /* увеличенное межстрочное */
                                            [letter-spacing:0em]
                                            [word-spacing:0.3em]              /* увеличенное межсловное */
                                            uppercase
                                            font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial']
                                            transition-all duration-200 text-[#141414] dark:text-white cursor-pointer
                                          `}
                                    >
                                        {item.label} <span className="text-[#141414][letter-spacing: 0em] ml-1 font-[300] text-[12px]" style={{
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
    );
}
