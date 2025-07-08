'use client';

import { useSupabaseProjects } from '../hooks/useSupabaseProjects';
import SupabaseImageSlider from './SupabaseImageSlider';

interface ProjectContentProps {
  slug: string;
}

export default function ProjectContent({ slug }: ProjectContentProps) {
  const { projects, loading, error, getProjectByName } = useSupabaseProjects();

  console.log('🔍 ProjectContent Debug:', {
    slug,
    loading,
    error,
    projectsCount: projects?.length,
    projects: projects,
    allProjectNames: projects?.map(p => p.name)
  });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl text-red-500">Ошибка: {error}</div>
      </div>
    );
  }

  const project = getProjectByName(slug);
  
  console.log('🎯 Project found:', project);
  
  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl text-red-500">
          Проект &quot;{slug}&quot; не найден. Доступные проекты: {projects?.map(p => p.name).join(', ')}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4 h-screen p-4 flex flex-col justify-between">
        <h1 className="font-[700] [font-stretch:semi-condensed] text-2xl">{project.label}</h1>
        <p className="text-sm uppercase tracking-widest [word-spacing:0.3em]">{project.description}</p>
      </div>
      <div className="w-3/4 h-screen p-4">
        <SupabaseImageSlider
          bucketName="project-images"
          folderPath={project.name}
          alt={project.label}
          width={"100%"}
          height={"100%"}
          className="w-full h-full"
        />
      </div>
    </div>
  );
} 