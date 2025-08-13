"use client";

import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>('main');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.snap-section');
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Простой счетчик: определяем номер секции по позиции скролла
      const sectionIndex = Math.round(scrollPosition / windowHeight);
      
      let currentSection = 'main';
      
      if (sectionIndex === 0) {
        currentSection = 'main';
      } else if (sectionIndex > 0 && sectionIndex <= sections.length) {
        // Получаем секцию по индексу (минус 1, так как первая секция - главная)
        const section = sections[sectionIndex - 1];
        currentSection = section.id || 'main';
      }
      
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

  return activeSection;
};