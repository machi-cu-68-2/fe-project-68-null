"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import deleteReservation from "@/lib/deleteReservation";
import { useRouter } from "next/navigation";

export default function CardButton({ reservationId }: { reservationId: string }) {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleConfirmCancel = async () => {
    const token = (session?.user as any)?.token;
    if (!token) return;

    try {
      setLoading(true);
      await deleteReservation(reservationId, token);
      setShowPopup(false);
      router.refresh();
    } catch (err: any) {
      console.error("Delete Error:", err);
      alert(err.message || "Failed to cancel reservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute top-[14.563rem] left-[2.125rem] w-[18rem] h-[2.75rem] flex items-start gap-[0.75rem] text-center">
        {/* Edit Button */}
        <Link 
          href={`/my-reservations/edit/${reservationId}`} 
          className="flex-1 h-[2.75rem] block"
        >
          <div className="h-full w-full shadow-[0px_4px_6px_rgba(0,0,0,0.1)] rounded-full bg-[#e8a118] flex items-center justify-center font-semibold text-white hover:bg-[#ce7b11] transition-colors">
            Edit
          </div>
        </Link>

        {/* Cancel Button */}
        <button
          onClick={() => setShowPopup(true)}
          className="w-[6.369rem] h-[2.75rem] block p-0 bg-transparent border-none cursor-pointer"
        >
          <div className="h-full w-full rounded-full border-[#ce7b11] border-solid border-[2px] box-border text-[#ce7b11] flex items-center justify-center font-semibold hover:bg-[#ce7b11] hover:text-white transition-colors">
            Cancel
          </div>
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center transform transition-all animate-fade-in font-inter">
            <h3 className="text-2xl font-playfair-display text-[#724a15] font-bold mb-4">
              Cancel Reservation?
            </h3>
            <p className="text-gray-600 mb-8">
              Are you sure you want to cancel this reservation? This action
              cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                disabled={loading}
                className="px-6 py-2 rounded-full font-bold transition-all duration-300 ease-out
                           text-[#ce7b11] border-[2px] border-[#ce7b11] 
                           hover:bg-[#ce7b11] hover:text-white hover:scale-105 hover:shadow-lg disabled:opacity-50"
              >
                No, Keep it
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={loading}
                className="px-6 py-2 rounded-full font-bold transition-all duration-300 ease-out
                           text-red-500 border-[2px] border-red-500 bg-transparent
                           hover:bg-red-500 hover:text-white hover:scale-105 hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                   <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : null}
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
