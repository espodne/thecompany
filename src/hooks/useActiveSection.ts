"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('main');
  const containerRef = useRef<HTMLDivElement>(null);

  // Функция для определения активной секции
  const updateActiveSection = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('.snap-section');
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const scrollPosition = scrollTop + containerHeight / 2;

    let currentSection = 'main';

    sections.forEach((section) => {
      const element = section as HTMLElement;
      const sectionTop = element.offsetTop;
      const sectionHeight = element.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const id = element.id || 'main';
        currentSection = id;
      }
    });

    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;


    updateActiveSection();

    const handleScroll = () => {
      updateActiveSection();
    };

    

    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', throttledScroll);
    
    return () => {
      container.removeEventListener('scroll', throttledScroll);
    };
  }, [updateActiveSection]);

  return { activeSection, containerRef };
};