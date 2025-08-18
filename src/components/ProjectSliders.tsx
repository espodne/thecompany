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
    <>

      <section
        id={project.href.replace('#', '')}
        className="snap-section pt-[10px]"
      >
        <div className="flex justify-end w-full mb-10">
          {imageUrls.length > 0 ? (
            <Slider
              images={imageUrls}
              alt={project.label}
              width={isSmallHeight ? "min(100vw, 665px)" : "min(100vw, 100vh)"}
              height={isSmallHeight ? "min(97.5vh, 665px)" : "min(100vw, 97.5vh)"}
              className={`w-screen h-full`}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Изображения не найдены</p>
            </div>
          )}
        </div>
        <div className={`text-left flex justify-end`}>
           <div className={`${isSmallHeight ? 'w-[665px]' : 'w-[min(100vw,100vh)]'}`}>
            <h2 className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[800] text-[14px] uppercase cursor-pointer text-[#141414]">{project.title}</h2>
            <p className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[400] text-[14px] uppercase cursor-pointer text-[#141414] mt-4 indent-12">
              {project.description}
            </p>
          </div>
        </div>

      </section>

    </>
  );
}

export default function ProjectSliders() {
  return (
    <div className="snap-section">
      {projectsData.map((project) => (
        <ProjectSlider key={project.id} project={project} />
      ))}
    </div>
  );
}
