"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSupabaseImages } from '@/hooks/useSupabaseImages';

interface SupabaseImagesProps {
  bucketName: string;
  folderPath?: string;
  projectsData: { label: string, description?: string, href: string }[];
}

function SupabaseImages({ bucketName, folderPath, projectsData }: SupabaseImagesProps) {
    const { images, loading, error } = useSupabaseImages(bucketName, folderPath);
    const [positions, setPositions] = useState<{ top: string; left: string; size: string }[]>([]);

    useEffect(() => {
        if (images.length > 0) {
            const newPositions = images.map(() => {
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
                    size: Math.random() * 300 + 250 + 'px',
                };
            });
            setPositions(newPositions);
        }
    }, [images]);

    const handleMouseMove = (e: MouseEvent) => {
        const imageElements = document.querySelectorAll('.parallax-image');
        imageElements.forEach((image: Element) => {
            const speed = image.getAttribute('data-speed');
            const x = (window.innerWidth - e.pageX * Number(speed)) / 100;
            const y = (window.innerHeight - e.pageY * Number(speed)) / 100;
            (image as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
        });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    if (loading) return <div className="flex items-center justify-center h-full">Загрузка изображений...</div>;
    if (error) return <div className="flex items-center justify-center h-full">Ошибка: {error}</div>;

    return (
        <div className="relative w-full h-full">
            {positions.map((pos: { top: string; left: string; size: string }, index: number) => {
                const image = images[index];
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