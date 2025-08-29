import pb from '@/lib/pocketbase'

export interface Project {
    id: string
    name: string
    label: string
    title: string
    description: string
    images: string[]
    href: string
}

export async function fetchProjects(): Promise<Project[]> {
    try {
        // Fetch all projects from PocketBase
        const records = await pb.collection('projects').getFullList<Project>({
            sort: 'name',
        })

        // Compose image URLs for each project
        return records.map(project => ({
            ...project,
            // Images are stored as array of filenames in PocketBase
            // We need to construct the full URL for each image
            images: project.images?.map(filename => pb.files.getURL(project, filename)) || []
        }))
    } catch (error) {
        console.error('Error fetching projects:', error)
        return []
    }
}

// For backward compatibility, export a static array that will be populated
// This can be removed once all components are updated to use the async function
export const projectsData: Project[] = []
