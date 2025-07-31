import { DesktopLayout } from "@/layouts/DesktopLayout";
import DeviceDetector from "@/components/DeviceDetector";
import MobileLayout2 from "@/layouts/MobileLayout2";

export default function Home() {
  return (
    <DeviceDetector desktop={<DesktopLayout />} mobile={<MobileLayout2 />} />
  );
}