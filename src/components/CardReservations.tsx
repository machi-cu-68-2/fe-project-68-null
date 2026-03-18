import Image from "next/image";
import HeadCard from "@/components/HeadCard";
import CardTime from "@/components/CardTime";
import CardDay from "@/components/CardDay";
import CardCountPeople from "./CardCountPeople";
import CardButton from "@/components/CardButton";
export default function CardRerservations({
  name,
  day,
  time,
  countpeople,
}: {
  name: string;
  day: string;
  time: string;
  countpeople: string;
}) {
  return (
    <div className="mt-[1] w-[35rem] h-[20rem] relative flex flex-col items-start gap-[1.5rem] text-left text-[2rem] text-[#724a15] font-playfair-display">
      <div className="self-stretch h-[19.438rem] grid [justify-content:start] [align-content:start] gap-[0rem] py-[0rem] pl-[0rem] pr-[40.75rem] box-border text-[1rem]">
        <div className="w-full h-full absolute top-[0rem] left-[0rem] shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-white border-[#F8E9A1] border-solid border-[2px] box-border">
          <HeadCard name={name} />
          <div className="absolute top-[7.063rem] left-[2.125rem] w-[40rem] h-[6rem] flex flex-col items-start gap-[0.75rem] text-[#724a15] font-inter">
            <CardTime time={time} />
            <CardDay day={day} />
            <CardCountPeople countpeople={countpeople} />
          </div>
          <CardButton />
        </div>
      </div>
    </div>
  );
}
