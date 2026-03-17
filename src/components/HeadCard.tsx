export default function HeadCard({ name }: { name: string }) {
    return (
        // 1. คง absolute, top, left ไว้ที่เดิมเป๊ะๆ ลบแค่ pr- มหาโหดออก
        <div className="absolute top-[2.125rem] left-[2.125rem] h-[3.938rem] flex items-start justify-start box-border text-[1.5rem]">
            <div className="h-[3.938rem] relative">
                <div className="absolute top-[0rem] left-[0rem] h-[2rem] flex items-start">
                    <b className="relative leading-[2rem] whitespace-nowrap text-[#724a15]">{name}</b>
                </div>
                <div className="absolute top-[2.313rem] left-[0rem] rounded-[33554400px] bg-[#e8a118] w-[6rem] h-[1.625rem] text-[1rem] text-white font-inter">
                    <div className="absolute top-[0.25rem] left-[0.75rem] leading-[1.125rem] font-semibold">Upcoming</div>
                </div>

            </div>
        </div>
    );
}