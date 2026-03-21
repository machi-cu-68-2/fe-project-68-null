import { useState } from "react";
import { Restaurant } from "@/interface/Restaurant";
import { getOpeningHoursForDate, generateTimeSlots } from "@/lib/reservationUtils";

interface RestaurantReservationProps {
  restaurant: Restaurant;
  isLoggedIn: boolean;
  onReserve: () => void;
}

export default function RestaurantReservation({
  restaurant,
  isLoggedIn,
  onReserve,
}: RestaurantReservationProps) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const currentHours = getOpeningHoursForDate(
    restaurant.openingHours,
    selectedDate
  );

  const timeSlots =
    currentHours && !currentHours.closed
      ? generateTimeSlots(currentHours.open, currentHours.close)
      : [];

  return (
    <div className="sticky top-28 bg-white rounded-2xl border-2 border-[#f8e9a1] shadow-lg p-6 flex flex-col gap-5">
      <div>
        <h3 className="font-playfair-display font-bold text-xl text-[#724a15] mb-1">
          Make a Reservation
        </h3>
        <p className="text-[rgba(139,69,21,0.6)] text-sm">
          Secure your table at {restaurant.name}
        </p>
      </div>

      {/* Date */}
      <div className="flex flex-col gap-1.5">
        <label className="font-playfair-display font-semibold text-[#724a15] text-sm">
          Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-xl px-4 py-2.5 text-[#724a15] text-sm outline-none focus:border-[#ce7b11] transition-colors"
        />
      </div>

      {/* Time */}
      <div className="flex flex-col gap-1.5">
        <label className="font-playfair-display font-semibold text-[#724a15] text-sm">
          Time
        </label>
        <select 
          disabled={timeSlots.length === 0}
          className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-xl px-4 py-2.5 text-[#724a15] text-sm outline-none focus:border-[#ce7b11] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {timeSlots.length > 0 ? (
            timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))
          ) : (
            <option>Closed</option>
          )}
        </select>
      </div>

      {/* Guests */}
      <div className="flex flex-col gap-1.5">
        <label className="font-playfair-display font-semibold text-[#724a15] text-sm">
          Guests
        </label>
        <select className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-xl px-4 py-2.5 text-[#724a15] text-sm outline-none focus:border-[#ce7b11] transition-colors">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      {/* Reserve button */}
      <button
        onClick={onReserve}
        disabled={timeSlots.length === 0}
        className="w-full bg-[#ce7b11] hover:bg-[#e8a118] active:scale-[0.98] text-white font-playfair-display font-semibold text-lg py-3.5 rounded-full shadow-md transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoggedIn ? "Reserve a Table" : "Sign in to Reserve"}
      </button>

      {/* hint เมื่อยังไม่ได้ login */}
      {!isLoggedIn && (
        <p className="text-center text-[rgba(139,69,21,0.5)] text-xs -mt-2">
          You'll be redirected back here after signing in
        </p>
      )}

      {isLoggedIn && timeSlots.length > 0 && (
        <p className="text-center text-[rgba(139,69,21,0.5)] text-xs -mt-2">
          No credit card required to reserve
        </p>
      )}

      {timeSlots.length === 0 && (
        <p className="text-center text-red-500/70 text-xs -mt-2">
          Restaurant is closed on this day
        </p>
      )}
    </div>
  );
}
