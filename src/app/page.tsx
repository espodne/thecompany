import Images from "@/components/images";
import Navigation from "@/components/navigation";


const projectsData = [
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

const images = [
  '/images/section1/123.jpg',
  '/images/section1/121.jpg',
  '/images/section1/124.jpg',
  '/images/section1/125.jpg',
  '/images/section1/126.jpg',
  '/images/section1/121.jpg',
  '/images/section1/123.jpg',
  '/images/section1/121.jpg',
  '/images/section1/123.jpg',
];

export default function Home() {
  return (
    <>
      <div className="flex">
        <div className="w-1/4 h-screen p-4">
          <h1 className="font-bold">THE MOSCOW COMPANY©</h1>
          <p className="text-sm">We help brands create exceptional real-life experiences that leave lasting memories people love to share.</p>
          <Navigation
            items={projectsData}
            className="custom-nav-styles"
          />
        </div>

        <div className="w-3/4 h-screen p-4">
          <Images src={images} />
        </div>
      </div>
    </>
  );
}
