"use client";

import { useProjects } from "@/contexts/ProjectsContext";
import Slider from "./ImageSlider";
import {useProjectImages} from "@/hooks/useProjectImages";
import {Project} from "@/data/projectsData";

interface ProjectSliderProps {
  project: Project;
}

function MobileProjectSlider({ project }: ProjectSliderProps) {
  const { images, loading, error } = useProjectImages(project.name);

  if (loading) return <div className="flex items-center justify-center h-96">Загрузка изображений...</div>;
  if (error) return <div className="flex items-center justify-center h-96">Ошибка загрузки изображений</div>;

  const imageUrls = images.map(img => img.url);

  return (
    <section
      id={project.href.replace('#', '')}
      className="snap-section snap-start flex flex-col justify-start pt-[60px] min-h-screen"
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
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Изображения не найдены</p>
          </div>
        )}
      </div>

      <div className="text-left px-6">
        <h2 className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[800] text-[12px] uppercase cursor-pointer" style={{ color: 'var(--text-primary)' }}>{project.title}</h2>
        <p className="transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[400] text-[12px] uppercase cursor-pointer mt-2 indent-8" style={{ color: 'var(--text-primary)' }}>
          {project.description}
        </p>
      </div>
    </section>
  );
}

export default function MobileProjectSliders() {
  const { projects } = useProjects();

  return (
    <div className="snap-y snap-mandatory">
      {projects.map((project) => (
        <MobileProjectSlider key={project.id} project={project} />
      ))}
    </div>
  );
}
