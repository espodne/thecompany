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
  }
  
  export default function Navigation({ items, className = '', activeSection = 'main' }: NavigationProps) {
    const [clickedSection, setClickedSection] = useState<string>('glavstroy');
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, itemId: string) => {
      e.preventDefault();
      
      // Устанавливаем активную секцию при клике
      setClickedSection(itemId);
      
      // Извлекаем ID из href (убираем #)
      const id = href.replace('#', '');
      
      // Пробуем разные способы найти элемент
      let element = document.getElementById(id);
      
      if (!element) {
        // Если getElementById не сработал, пробуем querySelector с экранированием
        try {
          element = document.querySelector(href);
        } catch (error) {
          console.error('Invalid selector:', href);
          return;
        }
      }
      
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
          {items.map((item) => {
            // Простая логика: активна если это кликнутая секция
            const isActive = clickedSection === item.id;
            
            return (
              <li key={item.id} className="flex items-center gap-3">
                {isActive && (
                  <div 
                    className="w-1 h-1 rounded-full bg-black transition-all duration-300"
                  />
                )}
                {!isActive && (
                  <div className="w-1 h-1" />
                )}
                <a 
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href, item.id)}
                  className={`transition-all duration-200 [word-spacing:0.3em] tracking-widest font-[600] text-[14px] uppercase cursor-pointer ${
                    isActive ? 'text-black' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }