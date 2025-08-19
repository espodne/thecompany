"use client";

import { useState } from "react";
import { projectsData } from "@/data/projectsData"
import Navigation from "@/components/navigation"
import ProjectSliders from "@/components/ProjectSliders"
import SupabaseImages from "@/components/images"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useScreenHeight } from '@/hooks/useScreenHeight';

export const DesktopLayout = () => {
    const { activeSection, containerRef } = useActiveSection();
    const [hideIndicator, setHideIndicator] = useState(false);
    const screenHeight = useScreenHeight();
    const isSmallHeight = screenHeight < 800;

    const navigationItems = [
        ...projectsData.map(project => ({
            id: project.href.replace('#', ''), 
            label: project.label,
            href: project.href
        })),
    ];

    return (
        <>
            <div className="flex p-2.5">
                <div className="w-90 h-screen flex flex-col fixed left-0 top-0">
                    <div
                        className="mb-3 ml-4 mt-4 cursor-pointer font-['Greed_VF-TRIAL'] font-black text-[25px] leading-[25px] align-bottom"
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
                    <p className={`
                                font-[400]
                                text-[12px]
                                leading-[16px]
                                [letter-spacing:0em]
                                w-[300px]
                                indent-10
                                ml-4
                                mb-10
                                uppercase
                                font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial']
                                transition-all duration-200 ml-1 text-[#141414] cursor-pointer
                            `}>        Мы помогаем брендам делать праздники и события атмосферными и запоминающимися на долгие годы</p>

                    {/* Навигация и кнопки внизу */}
                    <div className="mt-auto overflow-y-auto desktop-navigation">
                        <p className="text-[8px] h-6 uppercase font-bold text-[#838383] indent-4 sticky top-0 bg-white z-10"
                        >Проекты</p>
                        <Navigation
                            items={navigationItems}
                            activeSection={activeSection}
                            projectsCount={projectsData.length}
                            hideIndicator={hideIndicator}
                            onNavigationClick={() => setHideIndicator(false)}
                        />
                    </div>
                </div>

                <div ref={containerRef} className="flex-1 ml-100 content-container">
                    {/* Главный экран с сеткой изображений */}
                    <div className="snap-section h-[100vh]" id="main">
                        <div className="flex justify-end w-full h-full">
                            <div 
                                className="relative"
                                style={{
                                    width: isSmallHeight ? "min(100vw, 665px)" : "min(100vw, 100vh)",
                                    height: isSmallHeight ? "min(97.5vh, 665px)" : "min(100vw, 97.5vh)"
                                }}
                            >
                                <SupabaseImages
                                    bucketName="project-images"
                                    folderPath="main"
                                    projectsData={projectsData}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Секции с проектами */}
                    <ProjectSliders />
                </div>
            </div>
        </>
    );
};