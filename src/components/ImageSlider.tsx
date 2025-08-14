"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function Slider({ 
  images, 
  alt, 
  className = "", 
  width = 300, 
  height = 200 
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const containerWidth = rect.width;
    
    const index = Math.floor((x / containerWidth) * images.length);
    const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
    
    setCurrentIndex(clampedIndex);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden inline-block ${className} mt-[60px]`}
      onMouseMove={handleMouseMove}
      style={{ width, height }}
    >
      <Image
        src={images[currentIndex] || images[0]}
        alt={alt}
        width={1920}
        height={1080}
        className="w-full h-full object-cover border-[1px] border-black transition-opacity duration-150"
        priority
      />
      
      {/* Progress Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 mx-4 flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-px flex-1 transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}