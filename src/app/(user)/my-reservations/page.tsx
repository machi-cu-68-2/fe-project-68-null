import ReservationHeader from "@/components/my-reservations/ReservationHeader";
import CardReservations from "@/components/my-reservations/CardReservations";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getReservations from "@/lib/getReservations";

export default async function MyReservationsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  const token = (session.user as any).token;
  let reservations = [];
  try {
    const res = await getReservations(token);
    reservations = res.data;
  } catch (err) {
    console.error("Error fetching reservations:", err);
  }

  return (
    <div className="flex flex-col w-full pb-20">
      <ReservationHeader count={reservations.length} />
      
      {reservations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-md rounded-[3rem] border-2 border-[#f8e9a1] mt-8">
          <p className="font-playfair-display text-2xl text-[#724a15] opacity-60">
            You haven't made any reservations yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12 mt-8 w-full justify-items-center">
          {reservations.map((item: any) => {
            const dateObj = new Date(item.reservationDate);
            const day = dateObj.toISOString().split("T")[0];
            const time = dateObj.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <CardReservations
                key={item._id}
                id={item._id}
                name={item.restaurant?.name || "Unknown Restaurant"}
                day={day}
                time={time}
                tableCount={item.tableCount}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
