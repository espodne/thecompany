"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useSupabaseImages } from '@/hooks/useSupabaseImages';

interface SupabaseImageSliderProps {
  bucketName: string;
  folderPath: string;
  alt: string;
  className?: string;
}

export default function SupabaseImageSlider({
  bucketName,
  folderPath,
  alt,
  className = "",
}: SupabaseImageSliderProps) {
  const { images, loading, error } = useSupabaseImages(bucketName, folderPath);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX;

    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        // swipe left
        setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
      } else {
        // swipe right
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Mouse movement for desktop
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
      <div className={`flex items-center justify-center bg-gray-100 w-screen h-screen ${className}`}>
        <span className="text-gray-500">Загрузка изображений...</span>
      </div>
    );
  }

  if (error || images.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 w-screen h-screen ${className}`}>
        <span className="text-gray-500">Изображения не найдены</span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden w-[99%] h-[350px] ${className}`}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={images[currentIndex]?.url || images[0]?.url}
        alt={alt}
        fill
        className="transition-opacity duration-150 cursor-pointer object-cover"
        priority
      />

      {/* Progress Indicator */}
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
