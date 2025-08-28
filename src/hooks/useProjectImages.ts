'use client'
import { useMemo } from 'react'
import { useProjects } from '@/contexts/ProjectsContext'

interface ImageData {
  id: string
  url: string
  name: string
  folderName?: string
}

export function useProjectImages(projectName?: string) {
  const { projects, loading, error } = useProjects()

  const images = useMemo(() => {
    if (projectName) {
      const project = projects.find(p => p.name === projectName)
      if (!project || !project.images) return []
      
      return project.images.map((url, index) => ({
        id: `${project.id}-${index}`,
        url,
        name: `image-${index}`,
        folderName: project.name
      }))
    } else {
      const allImages: ImageData[] = []
      
      for (const project of projects) {
        if (project.images && project.images.length > 0) {
          const projectImages = project.images.map((url, index) => ({
            id: `${project.id}-${index}`,
            url,
            name: `image-${index}`,
            folderName: project.name
          }))
          
          allImages.push(...projectImages)
        }
      }
      
      return allImages
    }
  }, [projects, projectName])

  return { images, loading, error }
}