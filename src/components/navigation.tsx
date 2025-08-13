import { useState } from 'react';

interface NavigationItem {
    id: string;
    label: string;
    href: string;
  }
  
  interface NavigationProps {
    items: NavigationItem[];
    className?: string;
    activeSection?: string;
    projectsCount?: number;
    hideIndicator?: boolean;
    onNavigationClick?: () => void;
  }
  
  export default function Navigation({ items, className = '', activeSection = 'main', projectsCount = 0, hideIndicator = false, onNavigationClick }: NavigationProps) {
    const [clickedSection, setClickedSection] = useState<string>('glavstroy');
    
    console.log('Navigation received activeSection:', activeSection);
    
    // Простая логика: используем скролл, если не кликали недавно
    const [lastClickTime, setLastClickTime] = useState<number>(0);
    const isRecentlyClicked = Date.now() - lastClickTime < 1000; // 1 секунда
    
    // Определяем активную секцию
    let finalActiveSection = 'glavstroy'; // по умолчанию
    
    if (isRecentlyClicked) {
      finalActiveSection = clickedSection;
    } else if (activeSection === 'main') {
      finalActiveSection = 'glavstroy'; // главный экран = первый проект
    } else {
      finalActiveSection = activeSection;
    }
    
    console.log('Final active section:', finalActiveSection);
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, itemId: string) => {
      e.preventDefault();
      setClickedSection(itemId);
      setLastClickTime(Date.now());
      
      // Показываем индикатор при клике на навигацию
      if (onNavigationClick) {
        onNavigationClick();
      }
      
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    return (
        <nav className={`mb-4 ${className}`}>
        <ul className="flex flex-col gap-2">
          {items.map((item, index) => {
            const itemId = item.href.replace('#', '');
            const isActive = finalActiveSection === itemId;
            // const isProject = index < projectsCount;
            
            return (
              <li key={itemId}>
                {index === projectsCount && (
                  <div className="mb-2 mt-6">
                    <p className="text-[8px] uppercase font-bold text-[#838383] indent-4">ПРОЕКТЫ</p>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  {isActive && !hideIndicator && (activeSection !== 'main' || isRecentlyClicked) && (
                    <div className="w-1 h-1 rounded-full bg-black transition-all duration-300" />
                  )}
                  {(!isActive || hideIndicator || (activeSection === 'main' && !isRecentlyClicked)) && (
                    <div className="w-1 h-1" />
                  )}
                  <a 
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href, itemId)}
                    className={`transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[700] text-[14px] uppercase cursor-pointer text-[#141414] ml-1`}
                  >
                    {item.label} <span className="text-[#A6A6A6] ml-3">2024</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }