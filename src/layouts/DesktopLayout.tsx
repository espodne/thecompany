"use client";

import { useState } from "react";
import { useProjects } from "@/contexts/ProjectsContext";
import Navigation from "@/components/navigation"
import ProjectSliders from "@/components/ProjectSliders"
import PocketbaseImages from "@/components/images"
import AboutSection from "@/components/AboutSection"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useScreenHeight } from '@/hooks/useScreenHeight';

export const DesktopLayout = () => {
    const { projects, loading, error } = useProjects();
    const { activeSection, containerRef } = useActiveSection();
    const [hideIndicator, setHideIndicator] = useState(true);
    const screenHeight = useScreenHeight();
    const isSmallHeight = screenHeight < 800;

    const navigationItems = [
        ...projects.map(project => ({
            id: project.href.replace('#', ''), 
            label: project.label,
            href: project.href
        })),
    ];

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading projects...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen">Error: {error}</div>;
    }

    return (
        <>
            <div className="flex p-2.5">
                <div className="w-90 h-screen flex flex-col fixed left-0 top-0">
                    <div
                        className="mb-3 ml-4 mt-4 cursor-pointer font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial'] font-[800] text-[12px] text-[#000000] leading-[12px] align-bottom"
                        style={{
                            fontStyle: 'Triple Bold',
                            letterSpacing: '0%',
                            verticalAlign: 'bottom'
                        }}
                        onClick={() => {
                            const firstSection = document.querySelector('.snap-section');
                            if (firstSection) {
                                firstSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                            setHideIndicator(true);
                        }}
                    >
                        COMPANY MOSCOW
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
                                ml-4
                                mb-10
                                text-[#14141499]
                                uppercase
                                font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial']
                                transition-all duration-200 ml-1 text-[#14141499] cursor-pointer
                            `}>        Мы помогаем брендам делать праздники и события атмосферными и запоминающимися на долгие годы</p>

                    {/* Навигация и кнопки внизу */}
                    <div className="mt-auto overflow-y-auto desktop-navigation">
                        
                        <Navigation
                            items={navigationItems}
                            activeSection={activeSection}
                            projectsCount={projects.length}
                            hideIndicator={hideIndicator}
                            onNavigationClick={() => setHideIndicator(false)}
                            aboutSectionId="about"
                        />
                    </div>
                </div>

                <div ref={containerRef} className="flex-1 ml-100 content-container">
                    {/* Главный экран с сеткой изображений */}
                    <div className="snap-section" id="main">
                        <div className="flex justify-end w-full h-full">
                            <div className="relative">
                                <PocketbaseImages
                                    projectsData={projects}
                                    width={isSmallHeight ? "min(100vw, 665px)" : "min(100vw, 100vh)"}
                                    height={isSmallHeight ? "min(97.5vh, 665px)" : "min(100vw, 97.5vh)"}
                               
                                />
                            </div>
                        </div>
                    </div>

                    {/* Секции с проектами */}
                    <ProjectSliders />
                    
                    {/* Секция "О нас" */}
                    <AboutSection />
                </div>
            </div>
        </>
    );
};