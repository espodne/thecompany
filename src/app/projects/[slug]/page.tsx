import { notFound } from 'next/navigation';
import Image from 'next/image';


export const projectsData = [
    { id: 'glavstroy', label: 'главстрой 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', href: '/projects/glavstroy', image: '/images/section1/123.jpg' },
    { id: 'beregovoy', label: 'Береговой & Kenguru 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', href: '/projects/beregovoy', image: '/images/section1/121.jpg' },
    { id: 'antiglyanec', label: 'Антиглянец 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', href: '/projects/antiglyanec', image: '/images/antiglyanec/01.jpg' },
    { id: 'tsum', label: 'TSUM Fashion Show 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', href: '/projects/tsum', image: '/images/section1/121.jpg' },
    { id: 'star', label: 'Star & DFF 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', href: '/projects/star', image: '/images/section1/123.jpg' },
    { id: 'finflare', label: 'Finflare x manneken 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem', href: '/projects/finflare', image: '/images/section1/121.jpg' },
    { id: 'lamoda', label: 'lamoda 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', href: '/projects/lamoda', image: '/images/section1/123.jpg' },
    { id: 'blueprint', label: 'The Blueprint 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', href: '/projects/blueprint', image: '/images/section1/121.jpg' },
    { id: 'blueprint', label: 'Blueprint 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', href: '/projects/blueprint', image: '/images/section1/123.jpg' },
];


interface ProjectPageProps {
    params: { slug: string };
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const project = projectsData.find(p => p.id === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/4 h-screen p-4 flex flex-col justify-between">
                <h1 className="font-[700] [font-stretch:semi-condensed] text-2xl">{project.label}</h1>
                <p className="text-sm uppercase tracking-widest [word-spacing:0.3em]">{project.description}</p>
            </div>
            <div className="w-3/4 h-screen p-4">
                <Image 
                    src={project.image} 
                    alt={project.label} 
                    width={1000} 
                    height={1000} 
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.id,
    }));
}