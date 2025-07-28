import { DesktopLayout } from "@/layouts/DesktopLayout";
import DeviceDetector from "@/components/DeviceDetector";
import MobileLayout2 from "@/layouts/MobileLayout2";

export const projectsData = [
  { id: 'glavstroy', label: 'главстрой 2024', href: '/projects/glavstroy' },
  { id: 'antiglyanec', label: 'Антиглянец 2024', href: '/projects/antiglyanec' },
  { id: 'tsum', label: 'TSUM Fashion Show 2024', href: '/projects/tsum' },
  { id: 'start-dff', label: 'Start & DFF 2024', href: '/projects/start-dff' },
  { id: 'finflare', label: 'Finflare x manneken 2024', href: '/projects/finflare' },
  { id: 'blueprint-1', label: 'The Blueprint 2024', href: '/projects/blueprint' },
  { id: 'mela', label: 'Mela', href: '/projects/mela' },
  { id: '12Storeez', label: '12Storeez', href: '/projects/12Storeez' },
  { id: '1811', label: '1811', href: '/projects/1811' },
  { id: 'beregovoy', label: 'Береговой & Kenguru 2024', href: '/projects/beregovoy' },
  { id: 'ostav', label: 'Оставь это ветру', href: '/projects/ostav' },
  { id: 'csum', label: 'ЦУМ Елка', href: '/projects/csum' },
];

export default function Home() {
  return (
    <DeviceDetector desktop={<DesktopLayout />} mobile={<MobileLayout2 />} projectsData={projectsData} />
  );
}