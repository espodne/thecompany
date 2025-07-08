'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ImageData {
  id: string
  url: string
  name: string
}

export function useSupabaseImages(bucketName: string, folderPath?: string) {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true)
        
        const { data: files, error: listError } = await supabase.storage
          .from(bucketName)
          .list(folderPath || '', { limit: 100 })

        if (listError) throw listError

        const imageUrls = files
          ?.filter(file => file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))
          .map(file => {
            const filePath = folderPath ? `${folderPath}/${file.name}` : file.name
            const { data } = supabase.storage
              .from(bucketName)
              .getPublicUrl(filePath)
            
            return {
              id: file.id || file.name,
              url: data.publicUrl,
              name: file.name
            }
          }) || []

        setImages(imageUrls)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [bucketName, folderPath])

  return { images, loading, error }
}