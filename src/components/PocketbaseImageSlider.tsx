"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useProjectImages } from '@/hooks/useProjectImages';
import { useIsMobile } from '@/hooks/useIsMobile';

interface PocketbaseImageSliderProps {
  projectName: string;
  alt: string;
  className?: string;
  width?: string;
  height?: string; 
}

export default function PocketbaseImageSlider({
  projectName,
  alt,
  className = "",
  width,
  height,
}: PocketbaseImageSliderProps) {
  const { images, loading, error } = useProjectImages(projectName);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  
  const containerHeight = height || (isMobile ? '350px' : '700px');
  const containerWidth = width || '99%';


  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    touchStartX.current = e.changedTouches[0].clientX;
    touchStartY.current = e.changedTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    
    const currentX = e.changedTouches[0].clientX;
    const currentY = e.changedTouches[0].clientY;
    
    const deltaX = Math.abs(currentX - touchStartX.current);
    const deltaY = Math.abs(currentY - touchStartY.current);
    

    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    touchEndX.current = e.changedTouches[0].clientX;

    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > 50) {
      e.preventDefault();
      if (distance > 0) {
       
        setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
      } else {
       
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
  };


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (images.length === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    const index = Math.floor((x / width) * images.length);
    const clampedIndex = Math.max(0, Math.min(index, images.length - 1));

    setCurrentIndex(clampedIndex);
  };

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width: containerWidth, height: containerHeight }}
      >
        <span className="text-gray-500">Загрузка изображений...</span>
      </div>
    );
  }

  if (error || images.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width: containerWidth, height: containerHeight }}
      >
        <span className="text-gray-500">Изображения не найдены</span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ 
        touchAction: 'pan-x pinch-zoom',
        width: containerWidth,
        height: containerHeight
      }}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={images[currentIndex]?.url || images[0]?.url}
        alt={alt}
        fill
        className="transition-opacity duration-150 cursor-pointer object-cover"
        priority
      />

     
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-[5px] h-[1px] w-[90vw] max-w-[400px]">
            {images.map((_, index) => (
              <div
                key={index}
                className={`flex-1 transition-colors duration-200 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}