import SupabaseImages from "@/components/images";
import Navigation from "@/components/navigation";

export const projectsData = [
  { id: 'glavstroy', label: 'главстрой 2024', href: '/projects/glavstroy' },
  { id: 'beregovoy', label: 'Береговой & Kenguru 2024', href: '/projects/beregovoy' },
  { id: 'antiglyanec', label: 'Антиглянец 2024', href: '/projects/antiglyanec' },
  { id: 'tsum', label: 'TSUM Fashion Show 2024', href: '/projects/tsum' },
  { id: 'star-dff', label: 'Star & DFF 2024', href: '/projects/star-dff' },
  { id: 'finflare', label: 'Finflare x manneken 2024', href: '/projects/finflare' },
  { id: 'lamoda', label: 'lamoda 2024', href: '/projects/lamoda' },
  { id: 'blueprint-1', label: 'The Blueprint 2024', href: '/projects/blueprint' },
  { id: 'blueprint-2', label: 'Blueprint 2024', href: '/projects/blueprint-2' },
];

export default function Home() {
  return (
    <>
      <div className="flex">
        <div className="w-1/4 h-screen p-4">
          <h1 className="font-[700] [font-stretch:semi-condensed]">THE MOSCOW COMPANY©</h1>
          <p className="text-sm uppercase tracking-widest [word-spacing:0.3em]">We help brands create exceptional real-life experiences that leave lasting memories people love to share.</p>
          <Navigation
            items={projectsData}
            className="custom-nav-styles"
          />
        </div>

        <div className="w-3/4 h-screen p-4">
          <SupabaseImages bucketName="public-images" projectsData={projectsData} />
        </div>
      </div>
    </>
  );
}