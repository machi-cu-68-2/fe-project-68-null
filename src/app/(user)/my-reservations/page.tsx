import ReservationHeader from "@/components/ReservationHeader";
import CardReservations from "@/components/CardReservations";
import NavBar from "@/components/NavBar";

// 1. Array เก็บข้อมูลการจอง (แก้เป็น YYYY-MM-DD แล้ว)
const reservationData = [
  {
    id: 1,
    name: "Restaurant THAI",
    day: "2026-03-31",
    time: "18:00",
    countpeople: "4",
  },
  {
    id: 2,
    name: "Restaurant CHINA",
    day: "2026-03-26",
    time: "19:30",
    countpeople: "4",
  },
  {
    id: 3,
    name: "Restaurant LOS",
    day: "2026-04-15",
    time: "12:00",
    countpeople: "4",
  },
  {
    id: 4,
    name: "Restaurant LOS",
    day: "2026-12-15",
    time: "12:00",
    countpeople: "4",
  },
  {
    id: 5,
    name: "Restaurant LOS",
    day: "2030-04-15",
    time: "12:00",
    countpeople: "4",
  },

];

// 2. ต้องมีคำว่า "export default function" ตรงนี้เสมอครับ!
export default function MyReservationsPage() {
  return (
    <div className="w-full min-h-screen bg-[#FEFAEC] flex flex-col items-center">
      <div className="sticky top-0 w-full z-50">
        <NavBar />
      </div>
      <div className="w-full max-w-[1440px] flex flex-col px-[6.937rem] pt-[4rem] pb-20 box-border font-playfair-display">
        {/* ส่งจำนวนข้อมูล (length) เข้าไปที่ ReservationHeader */}
        <ReservationHeader count={reservationData.length} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12 mt-8 w-full justify-items-center">
          {/* ใช้ .map() วนลูปสร้าง CardReservations ตามจำนวนข้อมูล */}
          {reservationData.map((item) => (
            <CardReservations
              key={item.id}
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
