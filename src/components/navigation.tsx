import Link from "next/link";

interface NavigationItem {
    id: string;
    label: string;
    href: string;
  }
  
  interface NavigationProps {
    items: NavigationItem[];
    className?: string;
  }
  
  export default function Navigation({ items, className = '' }: NavigationProps) {
    return (
        <nav className={`absolute bottom-0 mb-4 ${className}`}>
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.id}>
              <Link 
                href={item.href}
                className="hover:underline transition-all duration-200 underline-offset-4 [word-spacing:0.3em] tracking-widest font-[600] text-[14px] uppercase"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }