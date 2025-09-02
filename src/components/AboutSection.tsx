"use client";

import Image from 'next/image';
import { useScreenHeight } from '@/hooks/useScreenHeight';

export default function AboutSection() {
  const screenHeight = useScreenHeight();
  const isSmallHeight = screenHeight < 800;

  return (
    <section
      id="about"
      className="snap-section snap-start pt-[10px]"
    >
      <div className="flex justify-end w-full mb-4">
        <div
          className="relative overflow-hidden"
          style={{
            width: isSmallHeight ? "calc(min(100vw, 665px) - 20px)" : "calc(min(100vw, 100vh) - 20px)",
            height: isSmallHeight ? "min(97.5vh, 665px)" : "min(100vw, 97.5vh)"
          }}
        >
          <Image
            src="/footer.jpg"
            alt="О нас"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className={`text-left flex justify-end`}>
        <div
          className="flex flex-col"
          style={{
            width: isSmallHeight ? "calc(min(100vw, 665px) - 20px)" : "calc(min(100vw, 100vh) - 20px)"
          }}
        >
          <div className="mb-[300px]">
            <h2 className="font-[800] text-[12px] leading-[20px] [letter-spacing:0em] [word-spacing:0.3em] uppercase font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial'] transition-all duration-200 text-[var(--foreground)] cursor-pointer">
              О нас
            </h2>
            <p className="font-[400] text-[12px] leading-[20px] [letter-spacing:0em] [word-spacing:0.3em] uppercase font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial'] transition-all duration-200 text-[var(--foreground)] cursor-pointer mt-4 indent-12">
              Московская помпания — союз Светы Мухиной и Даши Ледневой, основанный в начале 2024 года. Мы помогаем компаниям делать коллаборации и открытия, запускать рекламные акции, оформлять мероприятия, сцены и помещения, и самое главное — делать это красиво.
            </p>
            <h2 className="font-[800] my-4 text-[12px] leading-[20px] [letter-spacing:0em] [word-spacing:0.3em] uppercase font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial'] transition-all duration-200 text-[var(--foreground)] cursor-pointer">
              Контакты
            </h2>
            <p className="font-[400] text-[12px] leading-[20px] [letter-spacing:0em] [word-spacing:0.3em] uppercase font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial'] transition-all duration-200 text-[var(--foreground)] cursor-pointer mt-4 indent-12">
              Света Мухина: Telegram; +79647603755; sveta@companymoscow.com
            </p>
            <p className="font-[400] text-[12px] leading-[20px] [letter-spacing:0em] [word-spacing:0.3em] uppercase font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial'] transition-all duration-200 text-[var(--foreground)] cursor-pointer mt-4 indent-12">
              Даша леднева: Telegram; +79919649535; Dasha@companymoscow.com
            </p>
          </div>

          <div className="pt-2 border-t-[1px] border-[var(--foreground)] opacity-20">
            <div className="flex items-center gap-6 mb-[20px]">
              <p className="font-[400] text-[12px] leading-[16px] [letter-spacing:0em] uppercase font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial'] text-[var(--foreground)]">
                ©2025 Московская компания
              </p>
              <p className="font-[400] text-[12px] leading-[16px] [letter-spacing:0em] uppercase font-['ABC_Oracle_Cyrillic_Plus_Variable_Unlicensed_Trial'] text-[var(--foreground)]">
                hello@companymoscow.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
