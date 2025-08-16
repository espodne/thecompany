'use client';

import { useState } from 'react';
import SupabaseImages from "@/components/images";
import { projectsData as projectsData2 } from "@/data/projectsData";
import MenuButton from "@/components/MenuButton";
import MobileMenu from "@/components/MobileMenu";
import MobileProjectSliders from "@/components/MobileProjectSliders";



export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <main className="scroll-animation h-screen overflow-y-scroll snap-y snap-mandatory m-0 p-0">
            <Section1 isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <MobileProjectSliders />
        </main>
    );
}

interface Section1Props {
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
}

const Section1 = ({ isMenuOpen, setIsMenuOpen }: Section1Props) => {
    return (
        <div className="min-h-screen snap-start text-[3.5vw] flex flex-col p-4">
            {/* Заголовок - верхняя зона */}
            <div
                className="mb-3 cursor-pointer fixed top-0 left-0 right-0 z-19 p-2 bg-white dark:bg-black text-black dark:text-white font-['Greed_VF-TRIAL'] font-black text-[25px] leading-[25px] align-bottom"
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
            <p className="text-[12px] uppercase tracking-widest mb-4 [word-spacing:0.3em] indent-10 mt-10">        Мы помогаем брендам делать праздники и события атмосферными и запоминающимися на долгие годы</p>

            {/* Картинки - средняя зона */}
            <div className="mt-[100px] px-4 py-4 flex items-center justify-center">
                <div className="w-full h-[250px]">
                    <SupabaseImages
                        bucketName="project-images"
                        width={60}
                        heigth={60}
                        projectsData={projectsData2}
                    />
                </div>
            </div>

            {/* Кнопка - нижняя зона */}
            <div className="mt-10 px-4 flex items-end justify-start pb-8">
                <MenuButton onClick={() => setIsMenuOpen(true)} />
                <MobileMenu
                    items={projectsData2.map(project => ({
                        id: project.name,
                        label: project.label,
                        href: `#${project.name}`
                    }))}
                    projectsCount={projectsData2.length}
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                />
            </div>
        </div>
    )
}


