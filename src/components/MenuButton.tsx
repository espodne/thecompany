'use client';

interface MenuButtonProps {
    onClick: () => void;
}

export default function MenuButton({ onClick }: MenuButtonProps) {
    return (
        <button 
            className="w-14 h-14 rounded-full uppercase border border-black text-black dark:text-white dark:border-white py-2 flex items-center justify-center"
            onClick={onClick}
        >
        </button>
    );
}
