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

function PocketbaseImages({ projectName, projectsData, width = 800, height = 600, className = "" }: PocketbaseImagesProps) {
    const { images, error } = useProjectImages(projectName);
    const [positions, setPositions] = useState<{ top: string; left: string; size: string; rotation: string; delay: string }[]>([]);
    const [imagesToUse, setImagesToUse] = useState<typeof images>([]);
    const isMobile = useIsMobile();
    const screenHeight = useScreenHeight();
    const isSmallHeight = screenHeight < 800;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (images.length === 0) return;


        const GRID_SIZE = 5;
        const TOTAL_IMAGES = GRID_SIZE * GRID_SIZE;


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
            const GRID_SIZE = 5;
            const containerWidth = typeof width === 'number' ? width : containerRef.current?.clientWidth || 800;
            const containerHeight = typeof height === 'number' ? height : containerRef.current?.clientHeight || 600;

            const GAP = 10;
            const LEFT_MARGIN = 20;

            const availableWidth = containerWidth - (GAP * (GRID_SIZE - 1)) - LEFT_MARGIN;
            const availableHeight = containerHeight - (GAP * (GRID_SIZE - 1));
            const imageSize = Math.min(availableWidth / GRID_SIZE, availableHeight / GRID_SIZE);

            const newPositions: { top: number; left: number; size: number; rotation: number; delay: number }[] = [];

            // Создаем массив задержек и перемешиваем их для рандомного появления
            const delays = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i * 0.2);
            for (let i = delays.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [delays[i], delays[j]] = [delays[j], delays[i]];
            }

            for (let row = 0; row < GRID_SIZE; row++) {
                for (let col = 0; col < GRID_SIZE; col++) {
                    const top = row * (imageSize + GAP);
                    const left = col * (imageSize + GAP) + LEFT_MARGIN;
                    const rotation = 0;
                    const index = row * GRID_SIZE + col;

                    newPositions.push({
                        top,
                        left,
                        size: imageSize,
                        rotation,
                        delay: delays[index]
                    });
                }
            }


            setPositions(newPositions.map(pos => ({
                top: `${pos.top}px`,
                left: `${pos.left}px`,
                size: `${pos.size}px`,
                rotation: `${pos.rotation}deg`,
                delay: `${pos.delay}s`,
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
            height: typeof height === 'string' ? height : '100%'
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
                            opacity: 0,
                            transform: `rotate(${pos.rotation})`,
                            animation: `fadeIn 2s forwards ${pos.delay}`
                        }}
                        onClick={() => {
                            const targetProject = projectsData.find(p => p.name === image.name);

                            if (targetProject) {
                                const id = targetProject.href.replace('#', '');
                                let element = document.getElementById(id);

                                if (!element) {
                                    try {
                                        element = document.querySelector(targetProject.href);
                                    } catch (error) {
                                        
                                        return error;
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
                            src={`${image.url}?thumb=400x400`}
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

export default PocketbaseImages;
