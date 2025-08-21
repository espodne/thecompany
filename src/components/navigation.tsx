import { useState } from 'react';
import Image from 'next/image';

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
    aboutSectionId?: string;
  }
  
  export default function Navigation({ items, className = '', activeSection = 'main', projectsCount = 0, hideIndicator = false, onNavigationClick, aboutSectionId = 'about' }: NavigationProps) {
    const [clickedSection, setClickedSection] = useState<string>('');
    const [lastClickTime, setLastClickTime] = useState<number>(0);
    
    console.log('Navigation received activeSection:', activeSection);
    
    const isRecentlyClicked = Date.now() - lastClickTime < 1000;
    
    let finalActiveSection = activeSection;
    
    if (isRecentlyClicked && clickedSection) {
      finalActiveSection = clickedSection;
    } else if (activeSection === 'main') {
      finalActiveSection = 'glavstroy'; 
    }
    
    console.log('Final active section:', finalActiveSection);
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, itemId: string) => {
      e.preventDefault();
      setClickedSection(itemId);
      setLastClickTime(Date.now());
      
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
            
            return (
              <li key={itemId}>
                {index === projectsCount && (
                  <div className="mb-2 mt-6">
                    <p className="text-[8px] uppercase font-bold text-[#838383] indent-4">ПРОЕКТЫ</p>
                  </div>
                )}
                <div className="flex items-center gap-1.5 ml-1.5">
                  {isActive && !hideIndicator && (
                    <div className="w-1 h-1 rounded-full bg-black transition-all duration-300" />
                  )}
                  {(!isActive || hideIndicator) && (
                    <div className="w-1 h-1" />
                  )}
                  <a 
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href, itemId)}
                    className={`
                      font-[700]
                      text-[12px]
                      leading-[20px]                     
                      
                      [letter-spacing:0.05em]
                      [word-spacing:0.3em]     
                      uppercase
                      font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial']
                      transition-all duration-200 text-[#141414] cursor-pointer
                    `}
                  >
                    {item.label} <span className="text-[#141414][letter-spacing: 0em] ml-1 font-[300] text-[12px]" style={{
                      fontWeight: "Triple Regular",
                      textTransform: "uppercase",
                      letterSpacing: "-0.7px"
                    }}>&apos;24</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
        
        <div className="mt-4  pt-4 border-t-[1.5px] border-[#14141433] ml-4">
          <div className="flex items-center mt-[-10px] gap-1.5 ml-[-10px]">
            {finalActiveSection === aboutSectionId && !hideIndicator && (
              <div className="w-1 h-1 rounded-full bg-black transition-all duration-300" />
            )}
            {finalActiveSection !== aboutSectionId || hideIndicator ? (
              <div className="w-1 h-1" />
            ) : null}
            <a 
              href={`#${aboutSectionId}`}
              onClick={(e) => {
                e.preventDefault();
                setClickedSection(aboutSectionId);
                setLastClickTime(Date.now());
                
                if (onNavigationClick) {
                  onNavigationClick();
                }
                
                const element = document.getElementById(aboutSectionId);
                if (element) {
                  element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              className="
                font-[700]
                text-[12px]
                leading-[20px]                     
                [letter-spacing:0em]
                [word-spacing:0.3em]  
                uppercase
                font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial']
                transition-all duration-200 text-[#141414] cursor-pointer
              "
            >
              О нас / контакты
            </a>
            <Image
              src="/Vector.svg"
              alt="Vector"
              width={12}
              height={12}
              className="ml-2"
            />
          </div>
        </div>
      </nav>
    );
  }