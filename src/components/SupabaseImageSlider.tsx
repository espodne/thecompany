"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useSupabaseImages } from '@/hooks/useSupabaseImages';

interface SupabaseImageSliderProps {
  bucketName: string;
  folderPath: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function SupabaseImageSlider({ 
  bucketName,
  folderPath,
  alt, 
  className = "", 
  width = 300, 
  height = 200 
}: SupabaseImageSliderProps) {
  const { images, loading, error } = useSupabaseImages(bucketName, folderPath);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (images.length === 0) return;

    const imageContainer = e.currentTarget;
    const rect = imageContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const imageWidth = rect.width;
    
    const index = Math.floor((x / imageWidth) * images.length);
    const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
    
    setCurrentIndex(clampedIndex);
  };

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500">Загрузка изображений...</span>
      </div>
    );
  }

  if (error || images.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500">Изображения не найдены</span>
      </div>
    );
  }

  return (
    <div 
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <Image
        src={images[currentIndex]?.url || images[0]?.url}
        alt={alt}
        width={1200}
        height={800}
        className="max-w-full max-h-full object-contain transition-opacity duration-150 cursor-pointer"
        onMouseMove={handleMouseMove}
        priority
      />
    </div>
  );
} 