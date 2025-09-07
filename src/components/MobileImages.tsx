'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useProjectImages } from '@/hooks/useProjectImages';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useScreenHeight } from '@/hooks/useScreenHeight';

interface PocketbaseImagesProps {
    projectName?: string;
    projectsData: { id: number | string, name: string, label: string, description?: string, href: string }[];
    width?: number | string;
    height?: number | string;
    className?: string;
}

function MobilePocketbaseImages({ projectName, projectsData, width = 800, height = 600, className = "" }: PocketbaseImagesProps) {
    const { images, error } = useProjectImages(projectName);
    
    // Диагностика загрузки изображений
    useEffect(() => {
        if (images.length > 0) {
            console.log(`Loaded ${images.length} images for project: ${projectName || 'all projects'}`);
            // Проверяем первые несколько URL
            images.slice(0, 3).forEach((img, idx) => {
                console.log(`Image ${idx}:`, img.url);
            });
        }
        if (error) {
            console.error('Error loading images:', error);
        }
    }, [images, error, projectName]);
    const [positions, setPositions] = useState<{ top: string; left: string; size: string; rotation: string }[]>([]);
    const [imagesToUse, setImagesToUse] = useState<typeof images>([]);
    const isMobile = useIsMobile();
    const screenHeight = useScreenHeight();
    const isSmallHeight = screenHeight < 800;
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });


    useEffect(() => {
        const updateContainerSize = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setContainerSize({ width, height });
            }
        };

        updateContainerSize();
        
        const resizeObserver = new ResizeObserver(updateContainerSize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (images.length === 0) return;

        const GRID_ROWS = 5;
        const GRID_COLS = 5;
        const TOTAL_IMAGES = GRID_ROWS * GRID_COLS;

        let imagesToUse: typeof images = [];
        if (images.length >= TOTAL_IMAGES) {
            // Изображения уже перемешаны в useProjectImages хуке
            imagesToUse = images.slice(0, TOTAL_IMAGES);
        } else {
            // Дублируем изображения для заполнения сетки
            for (let i = 0; i < TOTAL_IMAGES; i++) {
                imagesToUse.push(images[i % images.length]);
            }
        }

        setImagesToUse(imagesToUse);
    }, [images, isMobile, projectsData.length, projectName]);

    useEffect(() => {
        if (imagesToUse.length === 0 || containerSize.width === 0) return;

        const updatePositions = () => {
            const GRID_ROWS = 5;
            const GRID_COLS = 5;
            
  
            const containerWidth = containerSize.width;
            const containerHeight = containerSize.height;

            const SIDE_MARGIN = 10; 
            const GAP = 5;
            const SIZE_MULTIPLIER = 1.9;
            
         
            const availableWidth = containerWidth - (GAP * (GRID_COLS - 1)) - (SIDE_MARGIN * 2);
            const availableHeight = containerHeight - (GAP * (GRID_ROWS - 1));
            
           
            const imageSize = Math.min(availableWidth / GRID_COLS, availableHeight / GRID_ROWS) * SIZE_MULTIPLIER;

            const newPositions: { top: number; left: number; size: number; rotation: number }[] = [];

            for (let row = 0; row < GRID_ROWS; row++) {
                for (let col = 0; col < GRID_COLS; col++) {
       
                    const totalGridWidth = (imageSize * GRID_COLS) + (GAP * (GRID_COLS - 1));
                    const horizontalOffset = (containerWidth - totalGridWidth) / 2;
                    
                    const top = row * (imageSize + GAP);
                    const left = horizontalOffset + col * (imageSize + GAP);
                    const rotation = 0;

                    newPositions.push({ 
                        top, 
                        left, 
                        size: imageSize, 
                        rotation 
                    });
                }
            }

            setPositions(newPositions.map(pos => ({
                top: `${pos.top}px`,
                left: `${pos.left}px`,
                size: `${pos.size}px`,
                rotation: `${pos.rotation}deg`,
            })));
        };

        updatePositions();
        
        window.addEventListener('resize', updatePositions);
        
        return () => {
            window.removeEventListener('resize', updatePositions);
        };
    }, [imagesToUse, isMobile, isSmallHeight, containerSize]);

    if (error) return <div className="flex items-center justify-center h-full">Ошибка: {error}</div>;

    return (
        <div 
            ref={containerRef} 
            className={`relative mt-50 w-full h-full ${className}`} 
            style={{ 
                width: typeof width === 'string' ? width : '100%', 
                height: typeof height === 'string' ? height : '100%',
                padding: '0 10px',
                boxSizing: 'border-box',
            }}
        >
            {positions.map((pos, index) => {
                const image = imagesToUse[index];
                if (!image) return null;

                return (
                    <div
                        key={`${image.id}-${index}`}
                        className="absolute cursor-pointer"
                        style={{
                            top: pos.top,
                            left: pos.left,
                            width: pos.size,
                            height: pos.size,
                            opacity: 0,
                            transform: `rotate(${pos.rotation})`,
                            animation: `fadeIn 2s forwards ${Math.random() * 5}s`
                        }}
                        onClick={() => {
                            let targetProject;
                            
                            if (!projectName) {
                                const fileName = image.name.replace(/\.[^/.]+$/, ""); 
                                targetProject = projectsData.find(p => p.name === fileName);
                            } else {
                                targetProject = image.folderName 
                                    ? projectsData.find(p => p.name === image.folderName)
                                    : projectsData[index];
                            }
                            
                            if (targetProject) {
                                const id = targetProject.href.replace('#', '');
                                
                                let element = document.getElementById(id);
                                
                                if (!element) {
                                    try {
                                        element = document.querySelector(targetProject.href);
                                    } catch (error) {
                                        console.error('Invalid selector:', targetProject.href, error);
                                        return;
                                    }
                                }
                                
                                if (element) {
                                    element.scrollIntoView({ 
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }
                            }
                        }}
                    >
                        <Image
                            src={image.url}
                            alt={image.name}
                            width={500}
                            height={500}
                            priority={index < 6} // Приоритет только для первых 6 изображений
                            className="parallax-image object-cover w-full h-full"
                            data-speed={Math.random() * 2 + 1}
                            onError={(e) => {
                                console.error('Failed to load image:', image.url, e);
                            }}
                            onLoad={() => {
                                // console.log('Image loaded successfully:', image.url);
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default MobilePocketbaseImages;