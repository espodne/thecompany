"use client";

import { useState } from "react";
import { projectsData } from "@/data/projectsData"
import Navigation from "@/components/navigation"
import ProjectSliders from "@/components/ProjectSliders"
import SupabaseImages from "@/components/images"
import { useActiveSection } from "@/hooks/useActiveSection"
import Image from "next/image"
import { useScreenHeight } from '@/hooks/useScreenHeight';

export const DesktopLayout = () => {
    const activeSection = useActiveSection();
    const [hideIndicator, setHideIndicator] = useState(false);
    const screenHeight = useScreenHeight();


    const navigationItems = [
        ...projectsData.map(project => ({
            id: project.href.replace('#', ''), 
            label: project.label,
            href: project.href
        })),
        {
            id: 'about',
            label: 'О нас',
            href: '#about'
        },
        {
            id: 'contacts',
            label: 'Контакты',
            href: '#contacts'
        }
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

                <div className="flex-1  ml-100 content-container">
                    {/* Главный экран с сеткой изображений */}
                    <div className="snap-section h-screen" id="main">
                        <SupabaseImages
                            bucketName="project-images"
                            folderPath="main"
                            projectsData={projectsData}
                        />
                    </div>

                    {/* Секции с проектами */}
                    
                    <ProjectSliders />

                    {/* Секция "О нас" */}
                    <section id="about" className="snap-section ">
                        <div className={`flex ${screenHeight < 800 ? 'justify-end' : 'justify-center'} mb-2.5`}>
                            <Image 
                                src="/footer.jpg" 
                                alt="О нас" 
                                width={screenHeight < 800 ? 665 : 800} 
                                height={screenHeight < 800 ? 665 : 800} 
                                className={screenHeight < 800 ? '-mr-1.5' : ''}
                            />
                        </div>

                        <div className={`text-left ${screenHeight < 800 ? 'flex justify-end' : ''}`}>
                            <div className={`${screenHeight < 800 ? 'w-[665px] -mr-1.5' : 'w-full'}`}>
                                <h2 className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[800] text-[14px] uppercase cursor-pointer text-[#141414]">О НАС</h2>
                                <p className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[400] text-[14px] uppercase cursor-pointer text-[#141414] mt-4 indent-12">
                                Московская помпания — союз Светы Мухиной и Даши Ледневой, основанный в начале 2024 года. Мы помогаем компаниям делать коллаборации и открытия, запускать рекламные акции, оформлять мероприятия, сцены и помещения, и самое главное — делать это красиво.
                                </p>
                            </div>
                        </div>
                        <h1 className="mt-[500px] font-[350] uppercase text-[50px]">
                            hello@moscowcompany.ru
                        </h1>
                        <p className="font-[400] uppercase text-[12px] mb-4">© Московская компания 2025</p>
                    </section>

                    {/* Секция "Контакты" */}
                    {/* <section id="contacts" className="snap-section pt-4 pb-4">
                        <div className="text-left">
                            <h2 className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[800] text-[14px] uppercase cursor-pointer text-[#141414]">КОНТАКТЫ</h2>
                            <p className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[400] text-[14px] uppercase cursor-pointer text-[#141414] mt-4 indent-12">
                                Здесь будут контактные данные
                            </p>
                        </div>
                    </section> */}
                </div>
            </div>
        </>
    )
}