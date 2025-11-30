"use client";


export default function ConsultationBanner() {
    return (
        <section className=" w-full bg-[var(--siteCOlor)] lg:py-20 py-14 mx-auto bg-[url('/consultation-banner.png')] bg-cover bg-[80%_center] min-h-[400px] flex items-center">
            <div className="  w-full max-w-[800px] px-6 mx-auto flex sm:grid gap-8 flex-wrap sm:grid-cols-3 justify-center text-white">
                <div className="w-30 h-30 md:w-36 md:h-36 bg-[var(--siteCOlor)] mx-auto rounded-full flex items-cengter flex-col justify-center text-center border p-4">
                    <h4 className="text-[32px] font-bold">30+</h4>
                    <p className="text-[12px]">Project complete</p>
                </div>
                <div className="w-30 h-30 md:w-36 md:h-36 bg-[var(--siteCOlor)] mx-auto rounded-full flex items-cengter flex-col justify-center text-center border p-4">
                    <h4 className="text-[32px] font-bold">500+</h4>
                    <p className="text-[12px]">Media Activities</p>
                </div>
                <div className="w-30 h-30 md:w-36 md:h-36 bg-[var(--siteCOlor)] mx-auto rounded-full flex items-cengter flex-col justify-center text-center border p-4">
                    <h4 className="text-[32px] font-bold">10+</h4>
                    <p className="text-[12px]">experience</p>
                </div>
            </div>

        </section>
    );
}
