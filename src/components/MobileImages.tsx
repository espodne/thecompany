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
    const [positions, setPositions] = useState<{ top: string; left: string; size: string; rotation: string }[]>([]);
    const [imagesToUse, setImagesToUse] = useState<typeof images>([]);
    const isMobile = useIsMobile();
    const screenHeight = useScreenHeight();
    const isSmallHeight = screenHeight < 800;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (images.length === 0) return;

        
        const GRID_ROWS = 4;
        const GRID_COLS = 3;
        const TOTAL_IMAGES = GRID_ROWS * GRID_COLS;

        
        let imagesToUse: typeof images = [];
        if (images.length >= TOTAL_IMAGES) {
            imagesToUse = images.slice(0, TOTAL_IMAGES);
        } else {

            for (let i = 0; i < TOTAL_IMAGES; i++) {
                imagesToUse.push(images[i % images.length]);
            }
        }

        setImagesToUse(imagesToUse);
    }, [images, isMobile, projectsData.length, projectName]);

    useEffect(() => {
        if (imagesToUse.length === 0) return;

        const updatePositions = () => {
            const GRID_ROWS = 3;
            const GRID_COLS = 3;
            const containerWidth = typeof width === 'number' ? width : containerRef.current?.clientWidth || 800;
            const containerHeight = typeof height === 'number' ? height : containerRef.current?.clientHeight || 600;
 
            const GAP = 10;
            const SIDE_MARGIN = 10; 
            const SIZE_MULTIPLIER = 0.7;
            
            const availableWidth = containerWidth - (GAP * (GRID_COLS - 1)) - (SIDE_MARGIN * 2);
            const availableHeight = containerHeight - (GAP * (GRID_ROWS - 1));
            const imageSize = Math.min(availableWidth / GRID_COLS, availableHeight / GRID_ROWS) * SIZE_MULTIPLIER;

            const newPositions: { top: number; left: number; size: number; rotation: number }[] = [];

            for (let row = 0; row < GRID_ROWS; row++) {
                for (let col = 0; col < GRID_COLS; col++) {
                    const top = row * (imageSize + GAP);
                    const left = col * (imageSize + GAP) + SIDE_MARGIN;
                    const rotation = 0;

                    newPositions.push({ 
                        top, 
                        left, 
                        size: imageSize, 
                        rotation 
                    });
                }
            }

            console.log('Grid created:', newPositions.length, 'positions (should be 12)');
            console.log('Images to use:', imagesToUse.length);
            console.log('Container width:', containerWidth, 'Image size:', imageSize);

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
    }, [imagesToUse, isMobile, isSmallHeight, height, width]);

    if (error) return <div className="flex items-center justify-center h-full">Ошибка: {error}</div>;

    return (
        <div ref={containerRef} className={`relative w-full h-full ${className}`} style={{ 
            width: typeof width === 'string' ? width : '100%', 
            height: typeof height === 'string' ? height : '100%',
            paddingLeft: '5px',
            paddingRight: '5px'
        }}>
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
                            priority={true}
                            className="parallax-image object-cover w-full h-full"
                            data-speed={Math.random() * 2 + 1}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default MobilePocketbaseImages;
