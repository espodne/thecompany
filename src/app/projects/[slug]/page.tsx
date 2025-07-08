import { notFound } from 'next/navigation';
import ImageSlider from '@/components/ImageSlider';

export const projectsData = [
    {
        id: 'glavstroy',
        label: 'главстрой 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        href: '/projects/glavstroy',
        images: ['/images/section1/123.jpg']
    },
    {
        id: 'beregovoy',
        label: 'Береговой & Kenguru 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        href: '/projects/beregovoy',
        images: ['/images/section1/121.jpg']
    },
    {
        id: 'antiglyanec',
        label: 'Антиглянец 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        href: '/projects/antiglyanec',
        images: ['/images/antiglyanec/01.jpg']
    },
    {
        id: 'tsum',
        label: 'TSUM Fashion Show 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        href: '/projects/tsum',
        images: ['/images/section1/121.jpg', '/images/section1/123.jpg', '/images/antiglyanec/01.jpg', '/images/section2/127.jpg', '/images/section2/128.jpg', '/images/section1/124.jpg', '/images/section1/125.jpg', '/images/section1/126.jpg']
    },
];

interface ProjectPageProps {
    params: { slug: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {

    const { slug } = await params
    const project = projectsData.find(p => p.id === slug);
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
                <ImageSlider
                    images={project.images}
                    alt={project.label}
                    width={"100%"}
                    height={"100%"}
                    className="w-full h-full"
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