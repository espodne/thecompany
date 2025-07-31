'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSupabaseImages } from '@/hooks/useSupabaseImages';
import { useIsMobile } from '@/hooks/useIsMobile';

interface SupabaseImagesProps {
    bucketName: string;
    folderPath?: string;
    width?: number;
    heigth?: number; 
    projectsData: { id: number, name: string, label: string, description?: string, href: string }[];
}

function SupabaseImages({ bucketName, folderPath, projectsData, width, heigth }: SupabaseImagesProps) {
    const { images, loading, error } = useSupabaseImages(bucketName, folderPath);
    const [positions, setPositions] = useState<{ top: string; left: string; size: string; rotation: string }[]>([]);
    const [imagesToUse, setImagesToUse] = useState<typeof images>([]);
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Автоматические размеры в зависимости от устройства
    const imageWidth = width ?? (isMobile ? 30 : 60);
    const imageHeight = heigth ?? (isMobile ? 40 : 60);

    useEffect(() => {
        if (images.length === 0) return;

        const MAX_IMAGES = 8;

        // Если передан один проект (страница проекта) - показываем все изображения
        if (projectsData.length === 1) {
            setImagesToUse(images);
        } else {
            // Группируем изображения по проектам и берем по одному из каждого
            const imagesByProject = images.reduce((acc, image) => {
                if (image.folderName && !acc[image.folderName]) {
                    acc[image.folderName] = image;
                }
                return acc;
            }, {} as Record<string, typeof images[0]>);

            const uniqueProjectImages = Object.values(imagesByProject);
            const finalImages = isMobile 
                ? uniqueProjectImages.slice(0, 6) 
                : uniqueProjectImages.slice(0, MAX_IMAGES);
            
            setImagesToUse(finalImages);
        }
    }, [images, isMobile, projectsData.length]);

    useEffect(() => {
        if (imagesToUse.length === 0 || !containerRef.current) return;

        const container = containerRef.current.getBoundingClientRect();
        const containerWidth = container.width;
        const containerHeight = container.height;

        const newPositions: { top: number; left: number; size: number; rotation: number }[] = [];

        const MAX_ATTEMPTS = 100;

        const isOverlapping = (top: number, left: number, size: number) => {
            const buffer = 20;
            return newPositions.some(pos => {
                const rect1 = { top, left, bottom: top + size, right: left + size };
                const rect2 = {
                    top: pos.top - buffer,
                    left: pos.left - buffer,
                    bottom: pos.top + pos.size + buffer,
                    right: pos.left + pos.size + buffer,
                };

                return !(
                    rect1.right < rect2.left ||
                    rect1.left > rect2.right ||
                    rect1.bottom < rect2.top ||
                    rect1.top > rect2.bottom
                );
            });
        };

        for (let i = 0; i < imagesToUse.length; i++) {
            let attempt = 0;
            let top = 0, left = 0, size = 0;

            do {
                size = Math.random() * imageWidth + imageHeight;
                const maxTop = containerHeight - size;
                const maxLeft = containerWidth - size;

                top = Math.random() * maxTop;
                left = Math.random() * maxLeft;

                attempt++;
            } while (isOverlapping(top, left, size) && attempt < MAX_ATTEMPTS);

            const rotation = Math.random() * 20 - 10; // random angle from -10 to +10 degrees

            newPositions.push({ top, left, size, rotation });
        }

        setPositions(newPositions.map(pos => ({
            top: `${pos.top}px`,
            left: `${pos.left}px`,
            size: `${pos.size}px`,
            rotation: `${pos.rotation}deg`,
        })));
    }, [imagesToUse, imageWidth, imageHeight]);

    if (loading) return <div className="flex items-center justify-center h-full">Загрузка изображений...</div>;
    if (error) return <div className="flex items-center justify-center h-full">Ошибка: {error}</div>;

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {positions.map((pos, index) => {
                const image = imagesToUse[index];
                if (!image) return null;

                return (
                    <div
                        key={image.id}
                        className="absolute cursor-pointer"
                        style={{
                            top: pos.top,
                            left: pos.left,
                            width: pos.size,
                            opacity: 0,
                            transform: `rotate(${pos.rotation})`,
                            animation: `fadeIn ${Math.random() * 2 + 1}s forwards ${index * 0.5}s`,
                        }}
                        onClick={() => {
                            const targetProject = image.folderName 
                                ? projectsData.find(p => p.name === image.folderName)
                                : projectsData[index];
                            if (targetProject) {
                                window.location.href = targetProject.href;
                            }
                        }}
                    >
                        <Image
                            src={image.url}
                            alt={image.name}
                            width={500}
                            height={500}
                            className="parallax-image object-cover hover:scale-105 transition-transform duration-300 w-full h-auto border-2 border-black"
                            data-speed={Math.random() * 2 + 1}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default SupabaseImages;
