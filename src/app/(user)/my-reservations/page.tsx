import ReservationHeader from "@/components/ReservationHeader";
import CardReservations from "@/components/CardReservations";

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
    <>
      <ReservationHeader count={reservationData.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12 mt-8 w-full justify-items-center">
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
    </>
  );
}
