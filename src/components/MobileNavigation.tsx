'use client';

import { useState } from 'react';
import Image from 'next/image';

interface NavigationItem {
    id: string;
    label: string;
    href: string;
}

interface MobileNavigationProps {
    items: NavigationItem[];
    projectsCount?: number;
}

export default function MobileNavigation({ items, projectsCount = 0 }: MobileNavigationProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <>
            {/* Кнопка меню */}
            <button 
                className="w-24 rounded-full uppercase bg-black text-white py-2"
                onClick={() => setIsOpen(true)}
            >
                menu
            </button>

            {/* Модальное меню */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
                    <div className="bg-white w-full h-full flex flex-col">
                        {/* Навигация */}
                        <div className="flex-1 p-6 flex flex-col">
                            <nav className="h-full flex flex-col">
                                <Image src="/MOSCOW.svg" alt="logo" width={180} height={180} />
                                <ul className="flex flex-col gap-2 mt-auto">
                                    {items.map((item, index) => {
                                        const itemId = item.href.replace('#', '');
                                        
                                        return (
                                            <li key={itemId}>
                                                {index === projectsCount && (
                                                    <div className="mb-4 mt-8">
                                                        <p className="text-[10px] uppercase font-bold text-[#838383] indent-4">ПРОЕКТЫ</p>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-4">
                                                    <a 
                                                        href={item.href}
                                                        onClick={(e) => handleClick(e, item.href)}
                                                        className={`transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[700] text-[18px] uppercase cursor-pointer text-[#141414] hover:text-gray-600`}
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
                    </div>
                </div>
            )}
        </>
    );
}
