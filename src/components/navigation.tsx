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

export default function Navigation({
  items,
  className = '',
  activeSection = 'main',
  projectsCount = 0,
  hideIndicator = false,
  onNavigationClick,
  aboutSectionId = 'about'
}: NavigationProps) {

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

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
          const isActive = activeSection === itemId;

          return (
            <li key={itemId}>
              {index === projectsCount && (
                <div className="mb-2 mt-6">

                </div>
              )}
              <div className="flex items-center gap-1.5 ml-1.5">
                {isActive && !hideIndicator && (
                  <div className="w-1 h-1 rounded-full bg-[var(--foreground)] transition-all duration-300" />
                )}
                {(!isActive || hideIndicator) && (
                  <div className="w-1 h-1" />
                )}
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`
                    font-[700]
                    text-[12px]
                    leading-[20px]                     
                    [letter-spacing:0.05em]
                    [word-spacing:0.3em]     
                    uppercase
                    font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial']
                    transition-all duration-200 text-[var(--foreground)] cursor-pointer
                  `}
                >
                  {item.label} <span className="text-[var(--foreground)][letter-spacing: 0em] ml-1 font-[300] text-[12px]" style={{
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
      <div className="mt-4 pt-2 border-t-[1px] border-[var(--foreground)] ml-4 opacity-20" />
      <div className="ml-4">
        <div className="flex items-center gap-1.5">
          {activeSection === aboutSectionId && !hideIndicator && (
            <div className="w-1 h-1 rounded-full bg-black transition-all duration-300" />
          )}
          {activeSection !== aboutSectionId || hideIndicator ? (
            <div className="w-1 h-1" />
          ) : null}
          <a
            href={`#${aboutSectionId}`}
            onClick={(e) => {
              e.preventDefault();

              if (onNavigationClick) {
                onNavigationClick();
              }

              const element = document.getElementById(aboutSectionId);
              if (element) {
                element.scrollIntoView({
                  behavior: 'smooth',
                  block: 'end'
                });
              }
            }}
            className="
              font-[700]
              ml-[-8px]
              text-[12px]
              leading-[20px]                     
              [letter-spacing:0em]
              [word-spacing:0.3em]  
              uppercase
              font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial']
              transition-all duration-200 text-[var(--foreground)] cursor-pointer
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