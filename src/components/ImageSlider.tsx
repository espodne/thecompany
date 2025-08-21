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


const getSupabaseImageUrl = (url: string, quality: number = 80, blur: number = 0) => {
  if (!url.includes('supabase.co')) return url;
  
  const params = new URLSearchParams();
  if (quality !== 80) params.append('quality', quality.toString());
  if (blur > 0) params.append('blur', blur.toString());
  
  return params.toString() ? `${url}?${params.toString()}` : url;
};

export default function Slider({ 
  images, 
  alt, 
  className = "", 
  width = 300, 
  height = 300 
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const containerWidth = rect.width;
    
    const index = Math.floor((x / containerWidth) * images.length);
    const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
    
    if (clampedIndex !== currentIndex) {
      setCurrentIndex(clampedIndex);
      setImageLoading(true);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const currentX = e.touches[0].clientX - rect.left;
    const containerWidth = rect.width;

    const index = Math.floor((currentX / containerWidth) * images.length);
    const clampedIndex = Math.max(0, Math.min(index, images.length - 1));

    if (clampedIndex !== currentIndex) {
      setCurrentIndex(clampedIndex);
      setImageLoading(true);
    }
  };

  const currentImage = images[currentIndex] || images[0];
  const blurImageUrl = getSupabaseImageUrl(currentImage, 20, 20);
  const fullImageUrl = getSupabaseImageUrl(currentImage, 80, 0);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };


  React.useEffect(() => {
    setImageLoading(true);
  }, [currentImage]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden w-full inline-block touch-none select-none ${className}`}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ width, height }}
    >

      <Image
        src={blurImageUrl}
        alt={`${alt} placeholder`}
        fill
        className="object-cover"
        style={{
          filter: 'blur(8px)',
          
        }}
      />
      

      <Image
        src={fullImageUrl}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />

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
