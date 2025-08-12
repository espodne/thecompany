"use client";

import { projectsData } from "@/data/projectsData"
import Navigation from "@/components/navigation"
import ProjectSliders from "@/components/ProjectSliders"
import SupabaseImages from "@/components/images"
import { useActiveSection } from "@/hooks/useActiveSection"

export const DesktopLayout = () => {
    const activeSection = useActiveSection();
    
    // Адаптируем данные для Navigation компонента
    const navigationItems = projectsData.map(project => ({
        id: project.href.replace('#', ''), // используем ID из ссылки
        label: project.label,
        href: project.href
    }));

    return (
        <>
            <div className="flex">
                <div className="w-1/4 h-screen p-4 border-r border-gray-200 overflow-y-auto fixed left-0 top-0 bg-white">
                    <h1 
                        className="heading-style cursor-pointer"
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
                        COMPANY MOSCOW
                    </h1>
                    <p className="text-sm uppercase tracking-widest [word-spacing:0.3em] indent-10">        Мы помогаем брендам делать праздники и события атмосферными и запоминающимися на долгие годы</p>
                    
                    {/* Навигация и кнопки внизу */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <Navigation
                            items={navigationItems}
                            className="mb-8"
                            activeSection={activeSection}
                        />
                        
                        <div className="flex flex-col gap-4">
                            <button 
                                className="text-sm uppercase tracking-widest font-[600] text-left hover:underline transition-all duration-200 underline-offset-4 [word-spacing:0.3em]"
                                onClick={() => {
                                    // TODO: Добавить функциональность
                                    console.log('О нас');
                                }}
                            >
                                О нас
                            </button>
                            <button 
                                className="text-sm uppercase tracking-widest font-[600] text-left hover:underline transition-all duration-200 underline-offset-4 [word-spacing:0.3em]"
                                onClick={() => {
                                    // TODO: Добавить функциональность
                                    console.log('Контакты');
                                }}
                            >
                                Контакты
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-3/4 p-4 ml-[25%] content-container">
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