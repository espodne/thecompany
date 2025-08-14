"use client";

import { projectsData } from "@/data/projectsData";
import Slider from "./ImageSlider";
import { useSupabaseImages } from '@/hooks/useSupabaseImages';

interface ProjectSliderProps {
  project: typeof projectsData[0];
}

function MobileProjectSlider({ project }: ProjectSliderProps) {
  const { images, loading, error } = useSupabaseImages("project-images", project.name);
  
  if (loading) return <div className="flex items-center justify-center h-96">Загрузка изображений...</div>;
  if (error) return <div className="flex items-center justify-center h-96">Ошибка загрузки изображений</div>;
  
  const imageUrls = images.map(img => img.url);
  
  return (
    <section 
      id={project.href.replace('#', '')}
      className="min-h-screen snap-start flex flex-col justify-center"
    >
      <div className="flex justify-center mb-4">
        {imageUrls.length > 0 ? (
          <Slider 
            images={imageUrls}
            alt={project.label}
            width="90vw"
            height="90vw"
            className="w-screen h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Изображения не найдены</p>
          </div>
        )}
      </div>
      
      <div className="text-left px-4">
        <h2 className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[800] text-[12px] uppercase cursor-pointer text-[#141414]">{project.title}</h2>
        <p className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[400] text-[12px] uppercase cursor-pointer text-[#141414] mt-2 indent-8">
          {project.description}
        </p>
      </div>
    </section>
  );
}

export default function MobileProjectSliders() {
  return (
    <div className="snap-y snap-mandatory">
      {projectsData.map((project) => (
        <MobileProjectSlider key={project.id} project={project} />
      ))}
    </div>
  );
}
