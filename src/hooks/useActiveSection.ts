"use client";

import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('main');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.snap-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

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

    // Более агрессивный snap-scroll
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const sections = document.querySelectorAll('.snap-section');
      const currentScroll = window.scrollY;
      const direction = e.deltaY > 0 ? 1 : -1;
      
      let targetSection: Element | null = null;
      
      if (direction > 0) {
        // Прокрутка вниз
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i] as HTMLElement;
          if (section.offsetTop > currentScroll + 50) {
            targetSection = section;
            break;
          }
        }
      } else {
        // Прокрутка вверх
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i] as HTMLElement;
          if (section.offsetTop < currentScroll - 50) {
            targetSection = section;
            break;
          }
        }
      }
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return activeSection;
};