import ReservationHeader from "@/components/ReservationHeader";
import CardReservations from "@/components/CardReservations";
import NavBar from "@/components/NavBar";

// 1. สร้าง Array เก็บข้อมูลการจองแต่ละร้านไว้ด้านบน
const reservationData = [
    { id: 1, name: "Restaurant THAI", day: "Wednesday, March 12", time: "18:00", countpeople: "4" },
    { id: 2, name: "Restaurant CHINA", day: "Wednesday, March 12", time: "18:00", countpeople: "4" },
    { id: 3, name: "Restaurant LOS", day: "Wednesday, March 12", time: "18:00", countpeople: "4" },
    { id: 4, name: "Restaurant USA", day: "Wednesday, March 12", time: "18:00", countpeople: "4" },
    { id: 5, name: "Restaurant USA", day: "Wednesday, March 12", time: "18:00", countpeople: "4" },

    // ถ้าลบข้อมูลออก 1 บรรทัด หรือเพิ่มเข้าไป ตัวเลขและ Card จะเปลี่ยนตามอัตโนมัติ
];

export default function ReservationPage() {
    return (
        <div className="w-full min-h-screen bg-[#FEFAEC] flex flex-col items-center">
            <div className="sticky top-0 w-full z-50">
                <NavBar />
            </div>
            <div className="w-full max-w-[1440px] flex flex-col px-[6.937rem] pt-[4rem] pb-20 box-border font-playfair-display">

                {/* 2. ส่งจำนวนข้อมูล (length) เข้าไปที่ ReservationHeader */}
                <ReservationHeader count={reservationData.length} />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-12 mt-8 w-full place-items-center">

                    {/* 3. ใช้ .map() วนลูปสร้าง CardReservations ตามจำนวนข้อมูลที่มีใน Array */}
                    {reservationData.map((item) => (
                        <CardReservations
                            key={item.id} // อย่าลืมใส่ key เวลาใช้ map ใน React
                            name={item.name}
                            day={item.day}
                            time={item.time}
                            countpeople={item.countpeople}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
}