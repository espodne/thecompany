import { projectsData } from '@/data/projectsData';
import SupabaseImageSlider from '@/components/SupabaseImageSlider';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.name,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find(p => p.name === params.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <>
      <div className="md:hidden flex flex-col h-screen p-4 overflow-y-auto">
        <h1 className="heading-style text-xl mb-2">COMPANY MOSCOW</h1>
  
        
        <div className="w-full flex-1 mb-4">
          <SupabaseImageSlider
            bucketName="project-images"
            folderPath={project.name}
            alt={project.label}
            width="100%"
            height="100%"
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="w-full">
        <h2 className="font-bold uppercase text-sm mb-4">{project.label}</h2>
          <p className="text-xs uppercase tracking-wider leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      <div className="hidden md:flex h-screen">
        <div className="w-1/4 h-screen p-4 flex flex-col justify-between">
          <h1 className="heading-style">COMPANY MOSCOW</h1>
          <div>
            <h1 className="font-[700] [font-stretch:semi-condensed] uppercase text-[14px] mb-2">
              {project.label}
            </h1>
            <p className="text-sm uppercase tracking-widest [word-spacing:0.3em] indent-10">
              {project.description}
            </p>
          </div>
        </div>
        
        <div className="w-3/4 h-screen p-4">
          <SupabaseImageSlider
            bucketName="project-images"
            folderPath={project.name}
            alt={project.label}
            width="100%"
            height="100%"
            className="w-full h-full"
          />
        </div>
      </div>
    </>
  );
}