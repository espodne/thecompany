'use client';

import { projectsData } from "@/data/projectsData";
import SupabaseImages from "@/components/images";
import SupabaseImageSlider from "@/components/SupabaseImageSlider";

export const MobileLayout = () => {

   

    return (
        <div className="flex flex-col items-center  min-h-screen w-full">
            {/* Screen 1 */}
            <div className="w-full flex flex-col items-center px-4 py-6">
                <h1 className="text-2xl font-bold text-center mb-4">COMPANY MOSCOW</h1>

                <p className="text-sm uppercase tracking-widest text-center indent-5 max-w-[90%] mb-6">
                    We help brands create exceptional real-life experiences that leave lasting memories people love to share.
                </p>

                <div className="w-full mb-10 h-[400px]">
                    <SupabaseImages
                        bucketName="project-images"
                        width={60}
                        heigth={60}
                        projectsData={projectsData}
                    />
                </div>

                <button className="w-24 rounded-full mt-30 uppercase bg-black text-white  py-2">
                    menu
                </button>
            </div>

            {/* Screen 2 */}
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


            {/* Screen 3 */}
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

            {/* Screen 4 */}
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

        </div>
    );
};
