"use client";

import { useState } from "react";
import { projectsData } from "@/data/projectsData"
import Navigation from "@/components/navigation"
import ProjectSliders from "@/components/ProjectSliders"
import SupabaseImages from "@/components/images"
import { useActiveSection } from "@/hooks/useActiveSection"
import Image from "next/image"

export const DesktopLayout = () => {
    const activeSection = useActiveSection();
    const [hideIndicator, setHideIndicator] = useState(false);

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
                <div className="w-120 h-screen p-4 flex flex-col fixed left-0 top-0 bg-white">
                    <div
                        className="heading-style mb-3 ml-4 mt-4 cursor-pointer"
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
                        <Image src="/MOSCOW.svg" alt="logo" width={180} height={180} />
                    </div>
                    <p className="text-[12px] ml-4 uppercase tracking-widest mb-[100px] [word-spacing:0.3em] indent-10">        Мы помогаем брендам делать праздники и события атмосферными и запоминающимися на долгие годы</p>

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

                <div className="flex-1 p-4 ml-120 content-container">
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

                    {/* Секция "О нас" */}
                    <section id="about" className="snap-section pt-4 pb-4">
                        <div className="flex justify-center mb-8">
                            <Image src="/footer.jpg" alt="О нас" width={1000} height={1000} />
                        </div>

                        <div className="flex justify-between text-left">
                            <div>
                                <h2 className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[800] text-[14px] uppercase cursor-pointer text-[#141414]">О НАС</h2>
                                <p className="transition-all w-[600px] duration-200 [word-spacing:0.3em] tracking-widest font-[400] text-[14px] uppercase cursor-pointer text-[#141414] mt-4 indent-12">
                                    Московская помпания — союз Светы Мухиной и Даши Ледневой, основанный в начале 2024 года. Мы помогаем компаниям делать коллаборации и открытия, запускать рекламные акции, оформлять мероприятия, сцены и помещения, и самое главное — делать это красиво.
                                </p>
                                <p className="transition-all w-[650px] duration-200 [word-spacing:0.3em] tracking-widest font-[400] text-[14px] uppercase cursor-pointer text-[#141414] mt-4">
                                    Пишите нам если хотите поработать или познакомиться.
                                </p>
                            </div>
                            <div>
                                <div>
                                    <div className="w-[32px] h-[32px] bg-[#B5B0B0] mb-2"></div>
                                    <div className="text-[12px] uppercase font-[400] leading-relaxed space-y-2">
                                        <p>света мухина</p>
                                        <p>telegram</p>
                                        <p>телефон</p>
                                        <p>инст</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="w-[32px] h-[32px] bg-[#B5B0B0] mb-2"></div>
                                    <div className="text-[12px] uppercase font-[400] leading-relaxed space-y-2">
                                        <p>даша леднева</p>
                                        <p>telegram</p>
                                        <p>телефон</p>
                                        <p>инст</p>
                                    </div>
                                </div>
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