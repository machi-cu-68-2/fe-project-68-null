export default function EditSidebar({ date, time }: { date: string; time: string }) {
  return (
    <div className="lg:col-span-2 bg-[#724a15] p-10 lg:p-14 text-white flex flex-col justify-between">
      <div>
        <div className="w-12 h-1px bg-[#ce7b11] mb-8" />
        <h1 className="text-4xl lg:text-5xl font-playfair-display font-black leading-tight mb-6">
          Refine Your <br/>Experience
        </h1>
        <p className="text-[#fefaec] opacity-70 leading-relaxed max-w-xs text-sm lg:text-base">
          Adjust your reservation details below. We'll ensure everything is perfect for your arrival.
        </p>
      </div>

      <div className="mt-12 lg:mt-0">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#fefaec]/20 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-[#ce7b11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#ce7b11] font-bold">Reserving For</p>
              <p className="font-playfair-display text-lg">{date || "Picking a date..."}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#fefaec]/20 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-[#ce7b11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#ce7b11] font-bold">Planned Time</p>
              <p className="font-playfair-display text-lg">{time || "--:--"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
