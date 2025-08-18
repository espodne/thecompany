"use client";

import { projectsData } from "@/data/projectsData";
import Slider from "./ImageSlider";
import { useSupabaseImages } from '@/hooks/useSupabaseImages';
import { useScreenHeight } from '@/hooks/useScreenHeight';

interface ProjectSliderProps {
  project: typeof projectsData[0];
}

function ProjectSlider({ project }: ProjectSliderProps) {
  const { images, loading, error } = useSupabaseImages("project-images", project.name);
  const screenHeight = useScreenHeight();
  const isSmallHeight = screenHeight < 800;
  
  if (loading) return <div className="flex items-center justify-center h-96">Загрузка изображений...</div>;
  if (error) return <div className="flex items-center justify-center h-96">Ошибка загрузки изображений</div>;
  
  const imageUrls = images.map(img => img.url);
  
  return (
    <section 
      id={project.href.replace('#', '')}
      className="snap-section pt-2.5 pb-2.5"
    >
      <div className={`flex ${isSmallHeight ? 'justify-end' : 'justify-center'} mb-2.5`}>
        {imageUrls.length > 0 ? (
          <div className={isSmallHeight ? '-mr-1.5' : ''}>
            <Slider 
              images={imageUrls}
              alt={project.label}
              width={isSmallHeight ? "min(100vw, 665px)" : "100vw"}
              height={isSmallHeight ? "min(97vh, 665px)" : "97vh"}
              className="w-screen h-full"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Изображения не найдены</p>
          </div>
        )}
      </div>
      
      <div className={`text-left ${isSmallHeight ? 'flex justify-end' : ''}`}>
        <div className={`${isSmallHeight ? 'w-[665px] -mr-1.5' : 'w-full'}`}>
          <h2 className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[800] text-[14px] uppercase cursor-pointer text-[#141414]">{project.title}</h2>
          <p className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[400] text-[14px] uppercase cursor-pointer text-[#141414] mt-4 indent-12">
            {project.description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ProjectSliders() {
  return (
    <div className="space-y-2 snap-section">
      {projectsData.map((project) => (
        <ProjectSlider key={project.id} project={project} />
      ))}
    </div>
  );
}
