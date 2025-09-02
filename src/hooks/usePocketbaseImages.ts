'use client'
import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase'
import { Project } from '@/data/projectsData'

interface ImageData {
  id: string
  url: string
  name: string
  folderName?: string
}

export function usePocketbaseImages(projectName?: string) {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true)

        if (projectName) {
   
          const records = await pb.collection('projects').getList<Project>(1, 1, {
            filter: `name="${projectName}"`,
          })

          if (records.items.length > 0) {
            const project = records.items[0]
            const imageUrls = project.images?.map((filename) => ({
              id: `${project.id}-${filename}`,
              url: pb.files.getURL(project, filename),
              name: filename,
              folderName: project.name
            })) || []

            setImages(imageUrls)
          }
        } else {
          const projects = await pb.collection('projects').getFullList<Project>()

          const allImages: ImageData[] = []

          for (const project of projects) {
            if (project.images && project.images.length > 0) {
              const projectImages = project.images.map((filename) => ({
                id: `${project.id}-${filename}`,
                url: pb.files.getURL(project, filename),
                name: filename,
                folderName: project.name
              }))

              allImages.push(...projectImages)
            }
          }

          setImages(allImages)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [projectName])

  return { images, loading, error }
}
