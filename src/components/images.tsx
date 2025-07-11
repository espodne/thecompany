'use client';

import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        if (images.length > 0) {
        
            const imagesToUse = isMobile ? images.slice(0, 6) : images;
            
            const newPositions = imagesToUse.map(() => {
                let top, left;
                do {
                    top = Math.random() * 80 + '%';
                    left = Math.random() * 80 + '%';
                } while (
                    parseFloat(top) > 40 && parseFloat(top) < 60 &&
                    parseFloat(left) > 40 && parseFloat(left) < 60
                );
                return {
                    top,
                    left,
                    size: Math.random() * 100 + 100 + 'px',
                };
            });
            setPositions(newPositions);
        }
    }, [images, isMobile]); 


    if (loading) return <div className="flex items-center justify-center h-full">Загрузка изображений...</div>;
    if (error) return <div className="flex items-center justify-center h-full">Ошибка: {error}</div>;

    return (
        <div className="relative w-full h-full">
            {positions.map((pos: { top: string; left: string; size: string }, index: number) => {
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