import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div
      className="relative w-full min-h-[37.5rem] flex items-center justify-center
     overflow-hidden text-center text-white font-playfair-display"
    >
      {/* 1. รูปภาพพื้นหลัง (ใช้ fill เพื่อให้ขยายเต็มกล่องอัตโนมัติ) */}
      <Image
        className="object-cover -z-20"
        fill // ใช้ fill แทน width/height
        priority // ใส่ priority เพื่อบอกให้ Next.js รีบโหลดรูปนี้เพราะเป็นรูปแรกสุด
        alt="Fine Dining Banner"
        src="/images/banner.jpg"
      />

      {/* 2. ฟิลเตอร์ไล่สี (Gradient Overlay) */}
      <div
        className="absolute inset-0 -z-10 opacity-90"
        style={{
          background:
            "linear-gradient(90deg, rgba(206, 123, 17, 0.8), rgba(232, 161, 24, 0.6) 50%, rgba(242, 210, 87, 0.4))",
        }}
      />

      {/* 3. กล่องใส่เนื้อหาตรงกลาง (จัดด้วย Flexbox) */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-4xl gap-6">
        {/* หัวข้อ */}
        <h1 className="text-[3rem] md:text-[4.5rem] font-bold leading-tight drop-shadow-md">
          Experience Fine Dining <br />
          <span className="text-[#FFFACD]">
            {" "}
            {/* รหัสสีของ lemonchiffon */}
            At Its Finest
          </span>
        </h1>

        {/* ข้อความรอง */}
        <p
          className="text-[1.125rem] md:text-[1.25rem] text-gray-100 max-w-[40rem]
         leading-relaxed drop-shadow-sm"
        >
          Discover the most exquisite restaurants and secure your table with
          just a few clicks
        </p>

        {/* ปุ่มกด */}
        <Link
          className="mt-4 bg-[#D2691E] hover:bg-[#b55818] text-white text-xl
        font-semibold py-4 px-12 rounded-full shadow-lg transition-all duration-300"
          href={"/discovery"}
        >
          Reserve a Table
        </Link>
      </div>
    </div>
  );
}
