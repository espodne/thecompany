"use client";

import { projectsData } from "@/data/projectsData"
import Navigation from "@/components/navigation"
import ProjectSliders from "@/components/ProjectSliders"
import SupabaseImages from "@/components/images"
import { useActiveSection } from "@/hooks/useActiveSection"
import Image from "next/image"

export const DesktopLayout = () => {
    const activeSection = useActiveSection();

    // Адаптируем данные для Navigation компонента
    const navigationItems = [
        ...projectsData.map(project => ({
            id: project.href.replace('#', ''), // используем ID из ссылки
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
            <div className="flex">
                <div className="w-96 h-screen p-4 flex flex-col fixed left-0 top-0 bg-white">
                    <div
                        className="heading-style mb-3 cursor-pointer"
                        onClick={() => {
                            const firstSection = document.querySelector('.snap-section');
                            if (firstSection) {
                                firstSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        }}
                    >
                        <Image src="/MOSCOW.svg" alt="logo" width={180} height={180} />
                    </div>
                    <p className="text-[12px] uppercase tracking-widest mb-4 [word-spacing:0.3em] indent-10">        Мы помогаем брендам делать праздники и события атмосферными и запоминающимися на долгие годы</p>

                    {/* Навигация и кнопки внизу */}
                    <div className="mt-auto overflow-y-auto">
                        <p className="text-[8px] uppercase font-bold text-[#838383] mb-2 indent-4"
                        >Проекты</p>
                        <Navigation
                            items={navigationItems}
                            className="mb-8"
                            activeSection={activeSection}
                            projectsCount={projectsData.length}
                        />

                        
                    </div>
                </div>

                <div className="flex-1 p-4 ml-96 content-container">
                    {/* Главный экран с сеткой изображений */}
                    <div className="snap-section h-screen" id="main">
                        <SupabaseImages
                            bucketName="project-images"
                            width={60}
                            heigth={130}
                            projectsData={projectsData}
                        />
                    </div>

                    {/* Секции с проектами */}
                    <ProjectSliders />
                </div>
            </div>
        </>
    )
}