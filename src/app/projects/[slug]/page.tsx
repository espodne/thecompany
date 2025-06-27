import { notFound } from 'next/navigation';
import Image from 'next/image';


export const projectsData = [
    { id: 'glavstroy', label: 'главстрой 2024', href: '/projects/glavstroy', image: '/images/section1/123.jpg' },
    { id: 'beregovoy', label: 'Береговой & Kenguru 2024', href: '/projects/beregovoy', image: '/images/section1/121.jpg' },
    { id: 'antiglyanec', label: 'Антиглянец 2024', href: '/projects/antiglyanec', image: '/images/section1/123.jpg' },
    { id: 'tsum', label: 'TSUM Fashion Show 2024', href: '/projects/tsum', image: '/images/section1/121.jpg' },
    { id: 'star', label: 'Star & DFF 2024', href: '/projects/star', image: '/images/section1/123.jpg' },
    { id: 'finflare', label: 'Finflare x manneken 2024', href: '/projects/finflare', image: '/images/section1/121.jpg' },
    { id: 'lamoda', label: 'lamoda 2024', href: '/projects/lamoda', image: '/images/section1/123.jpg' },
    { id: 'blueprint', label: 'The Blueprint 2024', href: '/projects/blueprint', image: '/images/section1/121.jpg' },
    { id: 'blueprint', label: 'Blueprint 2024', href: '/projects/blueprint', image: '/images/section1/123.jpg' },
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
        <main className="min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">{project.label}</h1>
            <Image src={project.image} alt={project.label} width={1000} height={1000} />
        </main>
    );
}

export async function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.id,
    }));
}