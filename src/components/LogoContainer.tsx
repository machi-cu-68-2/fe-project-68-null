import Image from "next/image";

export default function LogoContainer() {
  return (
    <div className="bg-[#724A15] p-2 rounded-md inline-flex items-center justify-center">
      <Image
        className="h-[1.75rem] w-[1.75rem]"
        width={50}
        height={50}
        sizes="100vw"
        alt="logo"
        src="/icons/logo.svg"
      />
    </div>
  );
}
