"use client";

import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>('main');

  useEffect(() => {
    console.log('useActiveSection hook initialized');
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('.snap-section');
      console.log('Found sections:', sections.length);
      
      // Выводим информацию о всех секциях
      sections.forEach((section, index) => {
        console.log(`Section ${index}: id="${section.id}", class="${section.className}"`);
      });
      
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      console.log('Scroll position:', scrollPosition);
      
      let currentSection = 'main';
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        
        console.log(`Section ${section.id}: top=${sectionTop}, bottom=${sectionBottom}`);
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          currentSection = section.id || 'main';
          console.log(`Found active section: ${currentSection}`);
        }
      });
      
      console.log('Setting active section to:', currentSection);
      setActiveSection(currentSection);
    };

    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll);
    
    // Вызываем сразу для установки начального состояния
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log('Current active section:', activeSection);
  return activeSection;
};
