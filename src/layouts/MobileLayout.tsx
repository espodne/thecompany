'use client';

import SupabaseImages from "@/components/images";
import { projectsData as projectsData2 } from "@/data/projectsData";    
import SupabaseImageSlider from "@/components/SupabaseImageSlider";
import MobileNavigation from "@/components/MobileNavigation";
import Image from "next/image";

// Типы
interface Project {
    id: number;
    name: string;
    label: string;
    description: string;
    href: string;
}

interface ProjectSectionProps {
    project: Project;
    bgColor: string;
    titleColor: string;
    subtitleColor: string;
    textColor: string;
}

// Получаем данные проектов
const finflareProject = projectsData2.find(p => p.name === 'finflare');
const antiglyanecProject = projectsData2.find(p => p.name === 'antiglyanec');
const storeezProject = projectsData2.find(p => p.name === '12Storeez');
const glavstroyProject = projectsData2.find(p => p.name === 'glavstroy');
const beregovoyProject = projectsData2.find(p => p.name === 'beregovoy');
const tsumProject = projectsData2.find(p => p.name === 'tsum');
const blueprintProject = projectsData2.find(p => p.name === 'blueprint');
const melaProject = projectsData2.find(p => p.name === 'mela');

export default function Home() {
    return (
        <main className="scroll-animation h-screen overflow-y-scroll snap-y snap-mandatory m-0 p-0">
            <Section1 />
            {finflareProject && (
                <ProjectSection 
                    project={finflareProject}
                    bgColor="#E5E1DD"
                    titleColor="#13A0E9"
                    subtitleColor="#B7A797"
                    textColor="text-black"
                />
            )}
            {antiglyanecProject && (
                <ProjectSection 
                    project={antiglyanecProject}
                    bgColor="#482110"
                    titleColor="#F1424A"
                    subtitleColor="#E4CCC1"
                    textColor="text-[#E4CCC1]"
                />
            )}
            {storeezProject && (
                <ProjectSection 
                    project={storeezProject}
                    bgColor="#664609"
                    titleColor="#F0CF12"
                    subtitleColor="#B7A797"
                    textColor="text-[#E4CCC1]"
                />
            )}
            {/* {glavstroyProject && (
                <ProjectSection 
                    project={glavstroyProject}
                    bgColor="#2D3A3A"
                    titleColor="#A8E6CF"
                    subtitleColor="#FFD93D"
                    textColor="text-[#C7CEDB]"
                />
            )}
            {beregovoyProject && (
                <ProjectSection 
                    project={beregovoyProject}
                    bgColor="#1A365D"
                    titleColor="#63B3ED"
                    subtitleColor="#F687B3"
                    textColor="text-[#E2E8F0]"
                />
            )}
            {tsumProject && (
                <ProjectSection 
                    project={tsumProject}
                    bgColor="#553C9A"
                    titleColor="#E53E3E"
                    subtitleColor="#FBB6CE"
                    textColor="text-[#F7FAFC]"
                />
            )}
            {blueprintProject && (
                <ProjectSection 
                    project={blueprintProject}
                    bgColor="#1A202C"
                    titleColor="#48BB78"
                    subtitleColor="#F6E05E"
                    textColor="text-[#CBD5E0]"
                />
            )}
            {melaProject && (
                <ProjectSection 
                    project={melaProject}
                    bgColor="#742A2A"
                    titleColor="#FED7D7"
                    subtitleColor="#68D391"
                    textColor="text-[#F7FAFC]"
                />
            )} */}
        </main>
    );
}

const Section1 = () => {
    return (
        <div className="min-h-screen snap-start text-[3.5vw] flex flex-col p-6">
            {/* Заголовок - верхняя зона */}
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

            {/* Картинки - средняя зона */}
            <div className=" px-4 py-4 flex items-center justify-center">
                <div className="w-full h-[350px]">
                    <SupabaseImages
                        bucketName="project-images"
                        width={60}
                        heigth={60}
                        projectsData={projectsData2}
                    />
                </div>
            </div>

                         {/* Кнопка - нижняя зона */}
             <div className="mt-10 px-4 flex items-end justify-center pb-8">
                 <MobileNavigation 
                     items={[
                         { id: 'glavstroy', label: 'Главстрой', href: '#glavstroy' },
                         { id: 'finflare', label: 'Finn Flare', href: '#finflare' },
                         { id: 'antiglyanec', label: 'Behind the Roof', href: '#antiglyanec' },
                         { id: '12Storeez', label: '12 STOREEZ', href: '#12Storeez' },
                     ]}
                     projectsCount={projectsData2.length}
                 />
             </div>
        </div>
    )
}

const ProjectSection = ({ project, bgColor, titleColor, subtitleColor, textColor }: ProjectSectionProps) => {
    return (
        <div className="min-h-screen snap-start text-[3.5vw] flex flex-col items-center justify-start text-white">
            <div className="w-full min-h-screen flex flex-col items-center py-8 px-4" style={{ backgroundColor: bgColor }}>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-center leading-tight" style={{ color: titleColor }}>
                        COMPANY MOSCOW
                    </h1>
                    <h1 className="text-2xl font-bold text-center leading-tight" style={{ color: subtitleColor }}>
                        & {project.label.toUpperCase()}
                    </h1>
                </div>

                <div className="w-full flex-1 mb-8">
                    <SupabaseImageSlider
                        bucketName="project-images"
                        folderPath={project.name}
                        alt="Project Images"
                        className="h-full"
                    />
                </div>

                <p className={`${textColor} text-sm uppercase tracking-widest [word-spacing:0.3em] indent-10 text-center max-w-4xl mb-8`}>
                    {project.description}
                </p>
            </div>
        </div>
    )
}
