'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSupabaseImages } from '@/hooks/useSupabaseImages';
import { useIsMobile } from '@/hooks/useIsMobile';

interface SupabaseImagesProps {
    bucketName: string;
    folderPath?: string;
    projectsData: { label: string, description?: string, href: string }[];
}

function SupabaseImages({ bucketName, folderPath, projectsData }: SupabaseImagesProps) {
    const { images, loading, error } = useSupabaseImages(bucketName, folderPath);
    const [positions, setPositions] = useState<{ top: string; left: string; size: string }[]>([]);
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (images.length === 0 || !containerRef.current) return;

        const container = containerRef.current.getBoundingClientRect();
        const containerWidth = container.width;
        const containerHeight = container.height;

        const imagesToUse = isMobile ? images.slice(0, 6) : images;
        const newPositions: { top: number; left: number; size: number }[] = [];

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
                size = Math.random() * 100 + 100; // from 100 to 200 px
                const maxTop = containerHeight - size;
                const maxLeft = containerWidth - size;

                top = Math.random() * maxTop;
                left = Math.random() * maxLeft;

                attempt++;
            } while (isOverlapping(top, left, size) && attempt < MAX_ATTEMPTS);

            newPositions.push({ top, left, size });
        }

        setPositions(newPositions.map(pos => ({
            top: `${pos.top}px`,
            left: `${pos.left}px`,
            size: `${pos.size}px`,
        })));
    }, [images, isMobile]);

    if (loading) return <div className="flex items-center justify-center h-full">Загрузка изображений...</div>;
    if (error) return <div className="flex items-center justify-center h-full">Ошибка: {error}</div>;

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {positions.map((pos, index) => {
                const image = (isMobile ? images.slice(0, 6) : images)[index];
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
                            animation: `fadeIn ${Math.random() * 2 + 1}s forwards ${index * 0.5}s`,
                        }}
                        onClick={() => window.location.href = projectsData[index]?.href}
                    >
                        <Image
                            src={image.url}
                            alt={image.name}
                            width={500}
                            height={500}
                            className="parallax-image object-cover hover:scale-105 transition-transform duration-300 w-full h-auto"
                            data-speed={Math.random() * 2 + 1}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default SupabaseImages;
