'use client';

import SupabaseImages from "@/components/images";
import { projectsData } from "@/app/page";
import SupabaseImageSlider from "@/components/SupabaseImageSlider";

export default function Home() {
    return (
        <main className="scroll-animation h-screen overflow-y-scroll snap-y snap-mandatory m-0 p-0">
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
        </main>
    );
}

const Section1 = () => {
    return (
        <div className="min-h-screen snap-start text-[3.5vw] flex flex-col">
            {/* Заголовок - верхняя зона */}
            <div className="flex-none pt-8 pb-4 px-4">
                <h1 className="text-2xl font-bold text-center">COMPANY MOSCOW</h1>
                <p className="text-sm uppercase tracking-widest text-center indent-5 max-w-[90%] mx-auto mt-4">
                    We help brands create exceptional real-life experiences that leave lasting memories people love to share.
                </p>
            </div>

            {/* Картинки - средняя зона */}
            <div className=" px-4 py-4 flex items-center justify-center">
                <div className="w-full h-[350px]">
                    <SupabaseImages
                        bucketName="project-images"
                        width={60}
                        heigth={60}
                        projectsData={projectsData}
                    />
                </div>
            </div>

            {/* Кнопка - нижняя зона */}
            <div className="mt-10 px-4 flex items-end justify-center pb-8">
                <button className="w-24 rounded-full uppercase bg-black text-white py-2">
                    menu
                </button>
            </div>
        </div>
    )
}

const Section2 = () => {
    return (
        <div className="min-h-screen snap-start text-[3.5vw] flex flex-col items-center justify-start text-white py-8">
            <div className="w-full flex flex-col items-center bg-[#E5E1DD] text-white py-8 px-4 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-center text-[#13A0E9]">
                        COMPANY MOSCOW
                    </h1>
                    <h1 className="text-2xl font-bold text-center text-[#B7A797]">
                        & FINFLARE
                    </h1>
                </div>

                <div className="w-full h-[350px]">
                    <SupabaseImageSlider
                        bucketName="project-images"
                        folderPath="finflare"
                        alt="Project Images"
                    />
                </div>

                <p className="text-black text-sm uppercase tracking-widest [word-spacing:0.3em] indent-10 text-center max-w-4xl">
                    Для презентации совместной коллекции брендов Finn Flare и Maneken мы оформили пространство в минималистичной, но выразительной стилистике, отразив главные идеи коллаборации. Центральное место заняли гардеробные шкафы в синем цвете с образами из новой коллекции. Пространство дополнила неоновая инсталляция с логотипом Finn Flare x Maneken, ставшая фотогеничным акцентом. Атмосфера урбанистического уюта поддерживалась деталями, напоминающими школьную или спортивную раздевалку: скамейки, шкафчики и текстиль с меховыми элементами создавали ощущение комфорта и тепла. Витрина с еловыми ветками и снегом добавила зимнего настроения и напомнила об идее утепления, заложенной в коллекции.
                </p>
            </div>
        </div>
    )
}

const Section3 = () => {
    return (
        <div className="min-h-screen snap-start text-[3.5vw] flex flex-col items-center justify-start text-white py-8">
            <div className="w-full flex flex-col items-center bg-[#482110] text-white py-8 px-4 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-center text-[#F1424A] leading-tight">COMPANY MOSCOW</h1>
                    <h1 className="text-2xl font-bold text-center text-[#E4CCC1] leading-tight">& BEHIND THE ROOF</h1>
                </div>

                <div className="w-full h-[350px]">
                    <SupabaseImageSlider
                        bucketName="project-images"
                        folderPath="antiglyanec"
                        alt="Project Images"
                    />
                </div>

                <p className="text-[#E4CCC1] text-sm uppercase tracking-widest [word-spacing:0.3em] indent-10 text-center max-w-4xl">
                    Для презентации совместной коллекции брендов Finn Flare и Maneken мы оформили пространство в минималистичной, но выразительной стилистике, отразив главные идеи коллаборации. Центральное место заняли гардеробные шкафы в синем цвете с образами из новой коллекции. Пространство дополнила неоновая инсталляция с логотипом Finn Flare x Maneken, ставшая фотогеничным акцентом. Атмосфера урбанистического уюта поддерживалась деталями, напоминающими школьную или спортивную раздевалку: скамейки, шкафчики и текстиль с меховыми элементами создавали ощущение комфорта и тепла. Витрина с еловыми ветками и снегом добавила зимнего настроения и напомнила об идее утепления, заложенной в коллекции.
                </p>
            </div>
        </div>
    )
}

const Section4 = () => {
    return (
        <div className="min-h-screen snap-start text-[3.5vw] flex flex-col items-center justify-start text-white py-8">
            <div className="w-full flex flex-col items-center bg-[#664609] text-white py-8 px-4 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-center text-[#F0CF12] leading-tight">COMPANY MOSCOW</h1>
                    <h1 className="text-2xl font-bold text-center text-[#B7A797] leading-tight">& 12 STOREEZ</h1>
                </div>

                <div className="w-full h-[350px]">
                    <SupabaseImageSlider
                        bucketName="project-images"
                        folderPath="12Storeez"
                        alt="Project Images"
                    />
                </div>

                <p className="text-[#E4CCC1] text-sm uppercase tracking-widest [word-spacing:0.3em] indent-10 text-center max-w-4xl">
                    Для презентации совместной коллекции брендов Finn Flare и Maneken мы оформили пространство в минималистичной, но выразительной стилистике, отразив главные идеи коллаборации. Центральное место заняли гардеробные шкафы в синем цвете с образами из новой коллекции. Пространство дополнила неоновая инсталляция с логотипом Finn Flare x Maneken, ставшая фотогеничным акцентом. Атмосфера урбанистического уюта поддерживалась деталями, напоминающими школьную или спортивную раздевалку: скамейки, шкафчики и текстиль с меховыми элементами создавали ощущение комфорта и тепла. Витрина с еловыми ветками и снегом добавила зимнего настроения и напомнила об идее утепления, заложенной в коллекции.
                </p>
            </div>
        </div>
    )
}

const Section5 = () => {
    return (
        <div className="min-h-screen snap-start text-[3.5vw] bg-[#6B4A8B] flex flex-col items-center justify-center text-white"> 
            <p>Final Section</p>
            <div className="flex gap-4">
               
            </div>
        </div>
    )
}