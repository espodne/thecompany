import { projectsData } from "@/data/projectsData"
import Navigation from "@/components/navigation"
import SupabaseImages from "@/components/images"

export const DesktopLayout = () => {
    // Адаптируем данные для Navigation компонента
    const navigationItems = projectsData.map(project => ({
        id: project.name, // используем name как id для Navigation
        label: project.label,
        href: project.href
    }));

    return (
        <>
            <div className="flex">
                <div className="w-1/4 h-screen p-4">
                    <h1 className="heading-style">COMPANY MOSCOW</h1>
                    <p className="text-sm w-[400px] uppercase tracking-widest [word-spacing:0.3em] indent-10">We help brands create exceptional real-life experiences that leave lasting memories people love to share.</p>
                    <Navigation
                        items={navigationItems}
                        className="custom-nav-styles"
                    />
                </div>

                <div className="w-3/4 h-screen p-4">
                    <SupabaseImages bucketName="project-images" width={60} heigth={130} projectsData={projectsData} />
                </div>
            </div>
        </>
    )
}