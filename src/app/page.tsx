import { DesktopLayout } from "@/layouts/DesktopLayout";
import DeviceDetector from "@/components/DeviceDetector";
import MobileLayout from "@/layouts/MobileLayout";
import { ProjectsProvider } from "@/contexts/ProjectsContext";

export default function Home() {
  return (
    <ProjectsProvider>
      <DeviceDetector desktop={<DesktopLayout />} mobile={<MobileLayout />} />
    </ProjectsProvider>
  );
}