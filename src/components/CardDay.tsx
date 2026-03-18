import Image from "next/image";
export default function CardDay({ day }: { day: string }) {
  return (
    <div className="self-stretch h-[1.5rem] flex items-center gap-[0.75rem]">
      <Image
        className="h-[1.25rem] w-[1.25rem] relative"
        width={20}
        height={20}
        sizes="100vw"
        alt="time"
        src="/icons/time.svg"
      />
      <div className="h-[1.5rem] w-full relative">
        <div className="absolute top-[-0.062rem] left-[0rem] leading-[1.5rem]">
          {day}
        </div>
      </div>
    </div>
  );
}
