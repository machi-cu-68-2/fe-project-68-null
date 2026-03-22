"use client";

import { useRouter } from "next/navigation";

interface EditFormProps {
  date: string;
  setDate: (v: string) => void;
  time: string;
  setTime: (v: string) => void;
  tableCount: number;
  setTableCount: (v: number) => void;
  submitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function EditForm({
  date,
  setDate,
  time,
  setTime,
  tableCount,
  setTableCount,
  submitting,
  onSubmit
}: EditFormProps) {
  const router = useRouter();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 group">
          <label htmlFor="edit-date" className="text-[10px] uppercase tracking-[0.2em] font-black text-[#724a15]/40 group-focus-within:text-[#ce7b11] transition-colors">
            Preferred Date
          </label>
          <input
            id="edit-date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent border-b-2 border-[#f8e9a1] py-3 text-2xl font-playfair-display text-[#724a15] outline-none focus:border-[#ce7b11] transition-all placeholder:text-[#724a15]/20"
          />
        </div>

        <div className="flex flex-col gap-2 group">
          <label htmlFor="edit-time" className="text-[10px] uppercase tracking-[0.2em] font-black text-[#724a15]/40 group-focus-within:text-[#ce7b11] transition-colors">
            Intended Time
          </label>
          <input
            id="edit-time"
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-transparent border-b-2 border-[#f8e9a1] py-3 text-2xl font-playfair-display text-[#724a15] outline-none focus:border-[#ce7b11] transition-all"
          />
        </div>

        <div className="flex flex-col gap-2 group">
          <label htmlFor="edit-tables" className="text-[10px] uppercase tracking-[0.2em] font-black text-[#724a15]/40 group-focus-within:text-[#ce7b11] transition-colors">
            Table Quantity
          </label>
          <div className="relative">
            <select
              id="edit-tables"
              value={tableCount}
              onChange={(e) => setTableCount(Number.parseInt(e.target.value, 10))}
              className="w-full bg-transparent border-b-2 border-[#f8e9a1] py-3 text-2xl font-playfair-display text-[#724a15] outline-none focus:border-[#ce7b11] transition-all appearance-none cursor-pointer"
            >
              {[1, 2, 3].map((n) => (
                <option key={n} value={n} className="text-base font-sans">
                  {n} {n === 1 ? "Exceptional Table" : "Exceptional Tables"}
                </option>
              ))}
            </select>
            <div className="absolute right-0 bottom-4 pointer-events-none text-[#ce7b11]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-5 border-2 border-[#724a15]/10 text-[#724a15]/60 font-bold rounded-2xl hover:bg-[#724a15]/5 hover:text-[#724a15] transition-all duration-300 active:scale-95"
        >
          Discard Changes
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 px-8 py-5 bg-[#ce7b11] text-white font-bold rounded-2xl shadow-[0_12px_24px_-8px_rgba(206,123,17,0.4)] hover:shadow-[0_16px_32px_-8px_rgba(206,123,17,0.5)] hover:bg-[#e8a118] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center gap-3"
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Updating Records...</span>
            </>
          ) : (
            <span>Confirm Refinement</span>
          )}
        </button>
      </div>
    </form>
  );
}
