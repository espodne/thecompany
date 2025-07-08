"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function ImageSlider({ 
  images, 
  alt, 
  className = "", 
  width = 300, 
  height = 200 
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
      if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; 
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Основной слайдер */}
      <div 
        ref={containerRef}
        className={`relative overflow-hidden cursor-pointer ${className}`}
        onMouseMove={handleMouseMove}
        onClick={handleImageClick}
        style={{ width, height }}
      >
        <Image
          src={images[currentIndex] || images[0]}
          alt={alt}
          fill
          className="object-cover transition-opacity duration-150"
          priority
        />
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            {/* Кнопка закрытия */}
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
            >
              ✕
            </button>

            {/* Стрелка влево */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-4 text-white text-3xl hover:text-gray-300 z-10"
              >
                ‹
              </button>
            )}

            {/* Увеличенная картинка */}
            <div 
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex]}
                alt={alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
                priority
              />
            </div>

            {/* Стрелка вправо */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-4 text-white text-3xl hover:text-gray-300 z-10"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}