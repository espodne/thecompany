"use client";

import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>('main');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.snap-section');
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      console.log('Scroll detected, sections found:', sections.length);
      console.log('Scroll position:', scrollPosition);
      
      // Простой счетчик: определяем номер секции по позиции скролла
      const sectionIndex = Math.round(scrollPosition / windowHeight);
      
      console.log('Section index:', sectionIndex);
      
      let currentSection = 'main';
      
      if (sectionIndex === 0) {
        currentSection = 'main';
      } else if (sectionIndex > 0 && sectionIndex <= sections.length) {
        // Получаем секцию по индексу (минус 1, так как первая секция - главная)
        const section = sections[sectionIndex - 1];
        currentSection = section.id || 'main';
      }
      
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