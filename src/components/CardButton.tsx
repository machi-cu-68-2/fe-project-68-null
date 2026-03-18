// เปลี่ยนมา Import Link ของ Next.js โดยตรง
import Link from "next/link";

export default function CardButton() {
  return (
    <div className="absolute top-[14.563rem] left-[2.125rem] w-[18rem] h-[2.75rem] flex items-start gap-[0.75rem] text-center">
      {/* ปุ่ม 1: ใช้ <Link> ครอบ และบังคับให้ขยายเต็มที่ด้วย flex-1 */}
      <Link href="/" className="flex-1 h-[2.75rem] block">
        <div className="h-full w-full shadow-[0px_4px_6px_rgba(0,_0,_0,_0.1)] rounded-full bg-[#e8a118] flex items-center justify-center font-semibold text-white hover:bg-[#ce7b11] transition-colors">
          View Restaurant
        </div>
      </Link>

      {/* ปุ่ม 2: ใช้ <Link> ครอบ และบังคับความกว้างด้วย w-[6.369rem] */}
      <Link href="/" className="w-[6.369rem] h-[2.75rem] block">
        <div className="h-full w-full rounded-full border-[#ce7b11] border-solid border-[2px] box-border text-[#ce7b11] flex items-center justify-center font-semibold hover:bg-[#ce7b11] hover:text-white transition-colors">
          Cancel
        </div>
      </Link>
    </div>
  );
}
