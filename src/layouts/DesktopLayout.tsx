import { projectsData } from "@/app/page"
import Navigation from "@/components/navigation"
import SupabaseImages from "@/components/images"

export const DesktopLayout = () => {
    return (
        <>
            <div className="flex">
                <div className="w-1/4 h-screen p-4">
                    <h1 className="heading-style">COMPANY MOSCOW</h1>
                    <p className="text-sm w-[400px] uppercase tracking-widest [word-spacing:0.3em] indent-10">We help brands create exceptional real-life experiences that leave lasting memories people love to share.</p>
                    <Navigation
                        items={projectsData}
                        className="custom-nav-styles"
                    />
                </div>

                <div className="w-3/4 h-screen p-4">
                    <SupabaseImages bucketName="project-images" projectsData={projectsData} />
                </div>
            </div>
        </>
    )
}