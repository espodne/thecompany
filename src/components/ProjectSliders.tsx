"use client";

import { projectsData } from "@/data/projectsData";
import Slider from "./ImageSlider";
import { useSupabaseImages } from '@/hooks/useSupabaseImages';

interface ProjectSliderProps {
  project: typeof projectsData[0];
}

function ProjectSlider({ project }: ProjectSliderProps) {
  const { images, loading, error } = useSupabaseImages("project-images", project.name);
  
  if (loading) return <div className="flex items-center justify-center h-96">Загрузка изображений...</div>;
  if (error) return <div className="flex items-center justify-center h-96">Ошибка загрузки изображений</div>;
  
  const imageUrls = images.map(img => img.url);
  
  return (
    <section 
      id={project.name}
      className="snap-section"
    >
      <div className="flex justify-center mb-8">
        {imageUrls.length > 0 ? (
          <Slider 
            images={imageUrls}
            alt={project.label}
            width={800}
            height={600}
            className="w-full max-w-4xl"
          />
        ) : (
          <div className="w-full max-w-4xl h-96 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Изображения не найдены</p>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">{project.label}</h2>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
          {project.description}
        </p>
      </div>
    </section>
  );
}

export default function ProjectSliders() {
  return (
    <div className="space-y-32">
      {projectsData.map((project) => (
        <ProjectSlider key={project.id} project={project} />
      ))}
    </div>
  );
}
