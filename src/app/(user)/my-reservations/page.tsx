import ReservationHeader from "@/components/ReservationHeader";
import CardReservations from "@/components/CardReservations";

import { reservationData } from "mockdata/reservation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// 2. ต้องมีคำว่า "export default function" ตรงนี้เสมอครับ!
export default async function MyReservationsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

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
