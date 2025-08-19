"use client";

import { useState, useEffect, useRef } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('main');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sections = container.querySelectorAll('.snap-section');
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const scrollPosition = scrollTop + containerHeight / 2;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const id = element.id || 'main';
          setActiveSection(id);
        }
      });
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection, containerRef };
};