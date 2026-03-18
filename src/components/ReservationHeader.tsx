export default function ReservationHeader({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-start">
      <h1 className="text-[2rem] font-bold text-[#8b4515] m-0 leading-none font-playfair-display mt-[6rem]">
        My Reservations
      </h1>
      <p className="text-[1.5rem]  text-[#E1AB64] m-0 font-playfair-display ">
        Manage your dining reservations
      </p>
      <div className="mt-[3rem] self-stretch flex flex-col items-start text-[#8b4515] text-[1.5rem]">
        <div className="self-stretch h-[2.25rem] relative">
          <b className="absolute top-[0rem] left-[0rem] leading-[2.25rem]">
            Upcoming ( {count} )
          </b>
        </div>
      </div>
    </div>
  );
}
