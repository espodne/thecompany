'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSupabaseImages } from '@/hooks/useSupabaseImages';
import { useIsMobile } from '@/hooks/useIsMobile';

interface SupabaseImagesProps {
    bucketName: string;
    folderPath?: string;
    projectsData: { id: number, name: string, label: string, description?: string, href: string }[];
}

function SupabaseImages({ bucketName, folderPath, projectsData }: SupabaseImagesProps) {
    const { images, error } = useSupabaseImages(bucketName, folderPath);
    const [positions, setPositions] = useState<{ top: string; left: string; size: string; rotation: string }[]>([]);
    const [imagesToUse, setImagesToUse] = useState<typeof images>([]);
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (images.length === 0) return;

        const MAX_IMAGES = 8;

        if (projectsData.length === 1 || folderPath === 'main') {
            setImagesToUse(images);
        } else {
            const imagesByProject = images.reduce((acc, image) => {
                if (image.folderName && !acc[image.folderName]) {
                    acc[image.folderName] = image;
                }
                return acc;
            }, {} as Record<string, typeof images[0]>);

            const uniqueProjectImages = Object.values(imagesByProject);
            const finalImages = isMobile 
                ? uniqueProjectImages.slice(0, 7) 
                : uniqueProjectImages.slice(0, MAX_IMAGES);
            
            setImagesToUse(finalImages);
        }


    }, [images, isMobile, projectsData.length, folderPath]);

    useEffect(() => {
        if (imagesToUse.length === 0) return;


        const containerWidth = isMobile ? 350 : 800;
        const containerHeight = isMobile ? 380 : 600;

        const newPositions: { top: number; left: number; size: number; rotation: number }[] = [];

        const MAX_ATTEMPTS = 100;

        const isOverlapping = (top: number, left: number, size: number) => {
            const buffer = 10;
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
                size = isMobile ? 60 : 150;
                const maxTop = containerHeight - size;
                const maxLeft = containerWidth - size;

                top = Math.random() * maxTop;
                left = Math.random() * maxLeft;

                attempt++;
            } while (isOverlapping(top, left, size) && attempt < MAX_ATTEMPTS);



            const rotation = 0;

            newPositions.push({ top, left, size, rotation });
        }

        setPositions(newPositions.map(pos => ({
            top: `${pos.top}px`,
            left: `${pos.left}px`,
            size: `${pos.size}px`,
            rotation: `${pos.rotation}deg`,
        })));
    }, [imagesToUse, isMobile]);

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
                            let targetProject;
                            
                            if (folderPath === 'main') {
                     
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
                            priority={true}
                            className="parallax-image object-cover w-full h-auto"
                            data-speed={Math.random() * 2 + 1}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default SupabaseImages;
