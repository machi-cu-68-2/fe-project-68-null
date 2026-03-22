"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import updateReservation from "@/lib/updateReservation";
import getReservations from "@/lib/getReservations";
import EditSidebar from "@/components/my-reservations/EditSidebar";
import EditForm from "@/components/my-reservations/EditForm";

interface EditReservationPageProps {
  params: Promise<{ id: string }>;
}

export default function EditReservationPage({ params }: Readonly<EditReservationPageProps>) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session, status } = useSession();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tableCount, setTableCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
      return;
    }

    if (status === "authenticated") {
      const fetchReservation = async () => {
        try {
          const res = await getReservations((session?.user as any).token);
          const reservation = res.data.find((r: any) => r._id === id);
          if (reservation) {
            const dateObj = new Date(reservation.reservationDate);
            setDate(dateObj.toISOString().split("T")[0]);
            setTime(dateObj.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }));
            setTableCount(reservation.tableCount);
          } else {
            setError("Reservation not found");
          }
        } catch (err) {
          console.error("Fetch Error:", err);
          setError("Failed to load reservation data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchReservation();
    }
  }, [id, session, status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const token = (session?.user as any)?.token;
    if (!token) return;

    try {
      setSubmitting(true);
      const reservationDate = new Date(`${date}T${time}`);
      await updateReservation(id, reservationDate.toISOString(), tableCount, token);
      router.push("/my-reservations");
      router.refresh();
    } catch (err: any) {
      console.error("Update Error:", err);
      setError(err.message || "Failed to update reservation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  if (loading && !error) {
    return (
      <div className="min-h-screen bg-[#fefaec] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#ce7b11] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-playfair-display text-[#724a15] text-xl animate-pulse">
          Retrieving your records...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefaec] relative overflow-hidden flex items-center justify-center py-16 px-6">
      <div className="absolute -top-20 -left-20 text-[40rem] font-playfair-display text-[#724a15] opacity-[0.03] pointer-events-none select-none italic">
        R
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(114,74,21,0.15)] overflow-hidden border border-[#f8e9a1] relative z-10 animate-in fade-in zoom-in-95 duration-700">
        
        <EditSidebar date={date} time={time} />

        <div className="lg:col-span-3 p-10 lg:p-14 bg-white flex flex-col justify-center">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-6 mb-8 animate-in slide-in-from-left-4 duration-500">
              <div className="flex items-start gap-4">
                <div className="bg-red-500 rounded-full p-1 shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-red-800 font-bold mb-1">Observation</h3>
                  <p className="text-red-700/80 text-sm leading-relaxed">{error}</p>
                </div>
              </div>
            </div>
          )}

          {error === "Reservation not found" ? (
            <button
              type="button"
              onClick={() => router.push("/my-reservations")}
              className="group w-full py-5 bg-[#724a15] text-white font-bold rounded-2xl hover:bg-[#ce7b11] transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <span>Back to Sanctuary</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ) : (
            <EditForm 
              date={date} 
              setDate={setDate} 
              time={time} 
              setTime={setTime} 
              tableCount={tableCount} 
              setTableCount={setTableCount} 
              submitting={submitting} 
              onSubmit={handleSubmit} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
