import { DesktopLayout } from "@/layouts/DesktopLayout";
import DeviceDetector from "@/components/DeviceDetector";
import MobileLayout from "@/layouts/MobileLayout";

export default function Home() {
  return (
    <DeviceDetector desktop={<DesktopLayout />} mobile={<MobileLayout />} />
  );
}