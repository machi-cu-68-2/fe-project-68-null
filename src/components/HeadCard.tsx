import { getDiffDay } from "@/lib/getDiffDay";

export default function HeadCard({
  name,
  day,
  time,
}: {
  name: string;
  day: string;
  time: string;
}) {
  // นำ day (YYYY-MM-DD) และ time (HH:mm) มาต่อกัน
  // จะได้เป็น "2026-03-25T18:00:00" ซึ่งแม่นยำ 100%
  const dateString = `${day}T${time}:00`;

  // เรียกใช้ฟังก์ชันคำนวณเวลา
  const timeLeft = getDiffDay(dateString);

  return (
    <div className="absolute top-[2.125rem] left-[2.125rem] h-[3.938rem] flex items-start justify-start box-border text-[1.5rem]">
      <div className="h-[3.938rem] relative">
        <div className="absolute top-[0rem] h-[2rem] flex items-start">
          <b className="relative leading-[2rem] whitespace-nowrap text-[#724a15]">
            {name}
          </b>
        </div>

        <div className="absolute top-[2.313rem] flex items-center gap-3 w-max">
          <div className="rounded-full bg-[#e8a118] w-full px-4 h-[1.625rem] flex items-center justify-center text-[1rem] text-white font-inter font-semibold">
            Upcoming ({timeLeft})
          </div>
        </div>
      </div>
    </div>
  );
}
