'use client';

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from 'lenis';
import SupabaseImages from "@/components/images";
import { projectsData } from "@/app/page";
import SupabaseImageSlider from "@/components/SupabaseImageSlider";

export default function Home() {

    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    })

    useEffect(() => {
        const lenis = new Lenis()

        function raf(time: number): void {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])

    return (
        <main ref={container} className="scroll-animation relative h-[500vh]">
            <Section1 scrollYProgress={scrollYProgress} />
            <Section2 scrollYProgress={scrollYProgress} />
            <Section3 scrollYProgress={scrollYProgress} />
            <Section4 scrollYProgress={scrollYProgress} />
            <Section5 scrollYProgress={scrollYProgress} />
        </main>
    );
}

interface SectionProps {
    scrollYProgress: MotionValue<number>;
}

const Section1 = ({ scrollYProgress }: SectionProps) => {

    const scale = useTransform(scrollYProgress, [0, 0.15, 0.19], [1, 1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0.15, 0.19], [0, -5])

    return (
        <motion.div style={{ scale, rotate }} className="sticky top-0 h-screen text-[3.5vw] flex flex-col items-center justify-center pb-[10vh]">

            <div className="flex gap-4">

                <div className="w-full flex flex-col px-4 items-center">
                    <div className="mb-10">
                        <h1 className="text-2xl font-bold text-center mt-10">COMPANY MOSCOW</h1>

                        <p className="text-sm uppercase tracking-widest text-center indent-5 max-w-[90%] mb-6">
                            We help brands create exceptional real-life experiences that leave lasting memories people love to share.
                        </p>
                    </div>

                    <div className="w-full  h-[450px]">
                        <SupabaseImages
                            bucketName="project-images"
                            width={60}
                            heigth={60}
                            projectsData={projectsData}
                        />
                    </div>

                    <button className="w-24 rounded-full  uppercase bg-black text-white py-2">
                        menu
                    </button>
                </div>


            </div>
        </motion.div>
    )
}

const Section2 = ({ scrollYProgress }: SectionProps) => {

    const scale = useTransform(scrollYProgress, [0.21, 0.25, 0.35, 0.39], [0.8, 1, 1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0.21, 0.25], [5, 0])

    return (
        <motion.div style={{ scale, rotate }} className="sticky top-0  h-screen text-[3.5vw] flex flex-col items-center justify-center text-white">

            <div className="w-full flex flex-col items-center justify-center bg-[#E5E1DD] text-white py-5 px-4 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-center text-[#13A0E9]">
                        COMPANY MOSCOW
                    </h1>
                    <h1 className="text-2xl font-bold text-center text-[#B7A797]">
                        & FINFLARE
                    </h1>
                </div>

                <SupabaseImageSlider
                    bucketName="project-images"
                    folderPath="finflare"
                    alt="Project Images"

                />

                <p className="text-black text-sm uppercase tracking-widest [word-spacing:0.3em]  indent-10 text-center">
                    Для презентации совместной коллекции брендов Finn Flare и Maneken мы оформили пространство в минималистичной, но выразительной стилистике, отразив главные идеи коллаборации. Центральное место заняли гардеробные шкафы в синем цвете с образами из новой коллекции. Пространство дополнила неоновая инсталляция с логотипом Finn Flare x Maneken, ставшая фотогеничным акцентом. Атмосфера урбанистического уюта поддерживалась деталями, напоминающими школьную или спортивную раздевалку: скамейки, шкафчики и текстиль с меховыми элементами создавали ощущение комфорта и тепла. Витрина с еловыми ветками и снегом добавила зимнего настроения и напомнила об идее утепления, заложенной в коллекции.
                </p>
            </div>

        </motion.div>
    )
}

const Section3 = ({ scrollYProgress }: SectionProps) => {

    const scale = useTransform(scrollYProgress, [0.41, 0.45, 0.55, 0.59], [0.8, 1, 1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0.41, 0.45], [-3, 0])

    return (
        <motion.div style={{ scale, rotate }} className="sticky top-0 h-screen text-[3.5vw] flex flex-col items-center justify-center text-white">

            <div className="w-full flex flex-col items-center justify-center bg-[#482110] text-white py-5 px-4 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-center text-[#F1424A] leading-tight">COMPANY MOSCOW</h1>
                    <h1 className="text-2xl font-bold text-center text-[#E4CCC1] leading-tight">& BEHIND THE ROOF</h1>
                </div>

                <SupabaseImageSlider
                    bucketName="project-images"
                    folderPath="antiglyanec"
                    alt="Project Images"

                />

                <p className="text-[#E4CCC1] text-sm uppercase tracking-widest [word-spacing:0.3em] indent-10 text-center">
                    Для презентации совместной коллекции брендов Finn Flare и Maneken мы оформили пространство в минималистичной, но выразительной стилистике, отразив главные идеи коллаборации. Центральное место заняли гардеробные шкафы в синем цвете с образами из новой коллекции. Пространство дополнила неоновая инсталляция с логотипом Finn Flare x Maneken, ставшая фотогеничным акцентом. Атмосфера урбанистического уюта поддерживалась деталями, напоминающими школьную или спортивную раздевалку: скамейки, шкафчики и текстиль с меховыми элементами создавали ощущение комфорта и тепла. Витрина с еловыми ветками и снегом добавила зимнего настроения и напомнила об идее утепления, заложенной в коллекции.
                </p>
            </div>
        </motion.div>
    )
}

const Section4 = ({ scrollYProgress }: SectionProps) => {

    const scale = useTransform(scrollYProgress, [0.61, 0.65, 0.75, 0.79], [0.8, 1, 1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0.61, 0.65], [4, 0])

    return (
        <motion.div style={{ scale, rotate }} className="sticky top-0 h-screen text-[3.5vw] flex flex-col items-center justify-center text-white">
            <div className="w-full flex flex-col items-center justify-center bg-[#664609] text-white py-5 px-4 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-center text-[#F0CF12] leading-tight">COMPANY MOSCOW</h1>
                    <h1 className="text-2xl font-bold text-center text-[#B7A797] leading-tight">& 12 STOREEZ</h1>
                </div>

                <SupabaseImageSlider
                    bucketName="project-images"
                    folderPath="12Storeez"
                    alt="Project Images"

                />

                <p className="text-[#E4CCC1] text-sm uppercase tracking-widest [word-spacing:0.3em] indent-10 text-center">
                    Для презентации совместной коллекции брендов Finn Flare и Maneken мы оформили пространство в минималистичной, но выразительной стилистике, отразив главные идеи коллаборации. Центральное место заняли гардеробные шкафы в синем цвете с образами из новой коллекции. Пространство дополнила неоновая инсталляция с логотипом Finn Flare x Maneken, ставшая фотогеничным акцентом. Атмосфера урбанистического уюта поддерживалась деталями, напоминающими школьную или спортивную раздевалку: скамейки, шкафчики и текстиль с меховыми элементами создавали ощущение комфорта и тепла. Витрина с еловыми ветками и снегом добавила зимнего настроения и напомнила об идее утепления, заложенной в коллекции.
                </p>
            </div>

        </motion.div>
    )
}

const Section5 = ({ scrollYProgress }: SectionProps) => {

    const scale = useTransform(scrollYProgress, [0.81, 0.85, 1], [0.8, 1, 1]);
    const rotate = useTransform(scrollYProgress, [0.81, 0.85], [-2, 0])

    return (
        <motion.div style={{ scale, rotate }} className="relative h-screen text-[3.5vw] bg-[#6B4A8B] flex flex-col items-center justify-center text-white"> 
            <p>Final Section</p>
            <div className="flex gap-4">
               
            </div>
        </motion.div>
    )
}