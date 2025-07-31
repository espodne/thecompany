'use client';

import SupabaseImages from "@/components/images";
import { projectsData as projectsData2 } from "@/data/projectsData";    
import SupabaseImageSlider from "@/components/SupabaseImageSlider";

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
        <div className="min-h-screen snap-start text-[3.5vw] flex flex-col">
            {/* Заголовок - верхняя зона */}
            <div className="flex-none pt-8 pb-4 px-4">
                <h1 className="text-2xl font-bold text-center">COMPANY MOSCOW</h1>
                <p className="text-sm uppercase tracking-widest text-center indent-5 max-w-[90%] mx-auto mt-4">
                    We help brands create exceptional real-life experiences that leave lasting memories people love to share.
                </p>
            </div>

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
                <button className="w-24 rounded-full uppercase bg-black text-white py-2">
                    menu
                </button>
            </div>
        </div>
    )
}

const ProjectSection = ({ project, bgColor, titleColor, subtitleColor, textColor }: ProjectSectionProps) => {
    return (
        <div className="min-h-screen snap-start text-[3.5vw] flex flex-col items-center justify-start text-white py-8">
            <div className="w-full flex flex-col items-center py-8 px-4 space-y-8" style={{ backgroundColor: bgColor }}>
                <div>
                    <h1 className="text-2xl font-bold text-center leading-tight" style={{ color: titleColor }}>
                        COMPANY MOSCOW
                    </h1>
                    <h1 className="text-2xl font-bold text-center leading-tight" style={{ color: subtitleColor }}>
                        & {project.label.toUpperCase()}
                    </h1>
                </div>

                <div className="w-full h-[350px]">
                    <SupabaseImageSlider
                        bucketName="project-images"
                        folderPath={project.name}
                        alt="Project Images"
                    />
                </div>

                <p className={`${textColor} text-sm uppercase tracking-widest [word-spacing:0.3em] indent-10 text-center max-w-4xl`}>
                    {project.description}
                </p>
            </div>
        </div>
    )
}
