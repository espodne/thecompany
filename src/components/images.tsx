"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function Images({ src, projectsData }: { src: string[], projectsData: { label: string, description?: string, href: string }[] }) {
    const [positions, setPositions] = useState<{ top: string; left: string; size: string }[]>([]);

    useEffect(() => {
        const newPositions = src.map(() => {
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
                size: Math.random() * 100 + 50 + 'px',
            };
        });
        setPositions(newPositions);
    }, [src]);

    const handleMouseMove = (e: MouseEvent) => {
        const images = document.querySelectorAll('.parallax-image');
        images.forEach((image: Element) => {
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

    return (
        <div className="relative w-full h-full">
            {positions.map((pos: { top: string; left: string; size: string }, index: number) => (
                <div
                    key={index}
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
                        src={src[index]}
                        alt={`Image ${index + 1}`}
                        width={200}
                        height={200}
                        className="parallax-image object-cover hover:scale-105 transition-transform duration-300 w-full h-auto"
                        data-speed={Math.random() * 2 + 1}
                    />
                </div>
            ))}
        </div>
    );
}

export default Images;