'use client';

interface MenuButtonProps {
    onClick: () => void;
}

export default function MenuButton({ onClick }: MenuButtonProps) {
    return (
        <button 
            className="w-10 h-10 flex items-center justify-center cursor-pointer"
            onClick={onClick}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_538_1137" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                    <rect width="20" height="20" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_538_1137)">
                    <path d="M4 12.5V11H16V12.5H4ZM4 9V7.5H16V9H4Z" fill="currentColor"/>
                </g>
            </svg>
        </button>
    );
}
