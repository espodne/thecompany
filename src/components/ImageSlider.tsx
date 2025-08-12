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
      className={`relative overflow-hidden inline-block ${className}`}
      onMouseMove={handleMouseMove}
      style={{ maxWidth: width, maxHeight: height }}
    >
      <Image
        src={images[currentIndex] || images[0]}
        alt={alt}
        width={1920}
        height={1080}
        className="w-full h-full object-cover border-2 border-black transition-opacity duration-150"
        priority
      />
    </div>
  );
}