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
    let resultImages: ImageData[] = []
    
    if (projectName) {
      const project = projects.find(p => p.name === projectName)
      if (!project || !project.images) return []
      
      resultImages = project.images.map((url, index) => ({
        id: `${project.id}-${index}`,
        url,
        name: project.name, // Используем имя проекта, а не image-${index}
        folderName: project.name
      }))
    } else {
      const allImages: ImageData[] = []
      
      for (const project of projects) {
        if (project.images && project.images.length > 0) {
          const projectImages = project.images.map((url, index) => ({
            id: `${project.id}-${index}`,
            url,
            name: project.name, // Используем имя проекта
            folderName: project.name
          }))
          
          allImages.push(...projectImages)
        }
      }
      
      resultImages = allImages
    }
    
    // Тасуем изображения для рандомного порядка
    const shuffled = [...resultImages]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    return shuffled
  }, [projects, projectName])

  return { images, loading, error }
}