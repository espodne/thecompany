'use client';

import { useState } from 'react';
import { useProjects } from "@/contexts/ProjectsContext";
import MenuButton from "@/components/MenuButton";
import MobileMenu from "@/components/MobileMenu";
import MobileProjectSliders from "@/components/MobileProjectSliders";
import MobilePocketbaseImages from "@/components/MobileImages";
import AboutSection from "@/components/AboutSection";



export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <main className="scroll-animation h-screen overflow-y-scroll snap-y snap-mandatory m-0 p-0">
            <Section1 isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <MobileProjectSliders />
            <AboutSection />
        </main>
    );
}

interface Section1Props {
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
}

const Section1 = ({ isMenuOpen, setIsMenuOpen }: Section1Props) => {
    const { projects, loading, error } = useProjects();
    
    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading projects...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen">Error: {error}</div>;
    }
    
    return (
        <div className="min-h-screen snap-start text-[3.5vw] flex flex-col p-2.5">
            {/* Заголовок - верхняя зона */}
            <div
                className="cursor-pointer font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial'] font-[800] text-[12px] leading-[12px] align-bottom
                 cursor-pointer fixed top-0 left-0 right-0 z-19 pl-6 pr-4 pt-4 bg-[var(--background)] text-[var(--foreground)] flex justify-between items-center"
                style={{
                    fontStyle: 'Triple Bold',
                    letterSpacing: '0%',
                    verticalAlign: 'bottom'
                }}
            >
                <div
                    onClick={() => {
                        const mainElement = document.querySelector('main');
                        if (mainElement) {
                            mainElement.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            });
                        }
                    }}
                >
                    COMPANY MOSCOW
                </div>
                <MenuButton onClick={() => setIsMenuOpen(true)} />
            </div>
            <p style={{
                fontStyle: 'Triple Regular',
                letterSpacing: '0%',

            }} className={`
                                font-[500]
                                text-[12px]
                                leading-[16px]
                                [letter-spacing:0.1em]
                                w-[300px]
                                indent-10
                                ml-2
                                mb-10
                                mt-12
                                text-[var(--foreground)]
                                opacity-60
                                uppercase
                                font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial']
                                transition-all duration-200 ml-1 cursor-pointer
                            `}>        Мы помогаем брендам делать праздники и события атмосферными и запоминающимися на долгие годы</p>

            {/* Картинки - средняя зона */}
            <div className="flex items-center justify-center mb-[50px]">
                <div className="w-full h-[200px] p-1.5">
                    <MobilePocketbaseImages
                        projectsData={projects}
                    />
                </div>
            </div>

            {/* Мобильное меню */}
            <MobileMenu
                items={[
                    ...projects.map(project => ({
                        id: project.name,
                        label: project.label,
                        href: `#${project.name}`,
           
                    })),
                    {
                        id: 'about',
                        label: 'О нас / контакты',
                        href: '#about',
              
                    }
                ]}
                projectsCount={projects.length}
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </div>
    )
}


