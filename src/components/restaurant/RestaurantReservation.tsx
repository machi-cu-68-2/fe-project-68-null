import { useState } from "react";
import { Restaurant } from "@/interface/Restaurant";
import getOpeningHoursForDate from "@/lib/getOpeningHoursForDate";
import generateTimeSlots from "@/lib/generateTimeSlots";

interface RestaurantReservationProps {
  restaurant: Restaurant;
  isLoggedIn: boolean;
  onReserve: (date: string, time: string, tableCount: number) => void;
  loading?: boolean;
  errorMessage?: string | null;
}

export default function RestaurantReservation({
  restaurant,
  isLoggedIn,
  onReserve,
  loading = false,
  errorMessage = null,
}: Readonly<RestaurantReservationProps>) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [tableCount, setTableCount] = useState(1);

  const currentHours = getOpeningHoursForDate(
    restaurant.openingHours,
    selectedDate
  );

  const timeSlots =
    currentHours && !currentHours.closed
      ? generateTimeSlots(currentHours.open, currentHours.close)
      : [];

  // Update selected time if slots change
  useState(() => {
    if (timeSlots.length > 0 && !selectedTime) {
      setSelectedTime(timeSlots[0]);
    }
  });

  const handleReserveClick = () => {
    if (!selectedTime && timeSlots.length > 0) {
      onReserve(selectedDate, timeSlots[0], tableCount);
    } else {
      onReserve(selectedDate, selectedTime, tableCount);
    }
  };

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
        <label htmlFor="reservation-date" className="font-playfair-display font-semibold text-[#724a15] text-sm">
          Date
        </label>
        <input
          id="reservation-date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-xl px-4 py-2.5 text-[#724a15] text-sm outline-none focus:border-[#ce7b11] transition-colors"
        />
      </div>

      {/* Time */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reservation-time" className="font-playfair-display font-semibold text-[#724a15] text-sm">
          Time
        </label>
        <select 
          id="reservation-time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
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

      {/* Table Count */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="table-count" className="font-playfair-display font-semibold text-[#724a15] text-sm">
          Tables
        </label>
        <select 
          id="table-count"
          value={tableCount}
          onChange={(e) => setTableCount(Number.parseInt(e.target.value, 10))}
          className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-xl px-4 py-2.5 text-[#724a15] text-sm outline-none focus:border-[#ce7b11] transition-colors"
        >
          {[1, 2, 3].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "table" : "tables"}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message UI */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2 text-red-700 text-xs animate-in fade-in slide-in-from-top-2">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Reserve button */}
      <button
        onClick={handleReserveClick}
        disabled={timeSlots.length === 0 || loading}
        className="w-full bg-[#ce7b11] hover:bg-[#e8a118] active:scale-[0.98] text-white font-playfair-display font-semibold text-lg py-3.5 rounded-full shadow-md transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Reserving...
          </>
        ) : (
          isLoggedIn ? "Reserve a Table" : "Sign in to Reserve"
        )}
      </button>

      {/* hint เมื่อยังไม่ได้ login */}
      {!isLoggedIn && (
        <p className="text-center text-[rgba(139,69,21,0.5)] text-xs -mt-2">
          You'll be redirected back here after signing in
        </p>
      )}

      {isLoggedIn && timeSlots.length > 0 && !loading && !errorMessage && (
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
