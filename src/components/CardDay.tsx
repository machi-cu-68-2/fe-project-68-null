export default function CardDay({ day }: { day: string }) {
  // สร้าง Date Object จากข้อความ "YYYY-MM-DD"
  const dateObj = new Date(day);

  const formattedDay = dateObj.toLocaleDateString("en-US", {
    weekday: "long", // วันในสัปดาห์ (Monday, Tuesday...)
    month: "long", // ชื่อเดือนเต็ม (January, February...)
    day: "numeric", // วันที่ (1, 2, 3...)
  });

  return (
    // สมมติว่าโครงสร้างเดิมเป็นแบบนี้ (ปรับ CSS ได้ตามของเดิมเลยครับ)
    <div className="flex items-center gap-2">
      {/* ไอคอนปฏิทิน (ถ้ามี) */}
      <span className="text-[#724a15] font-semibold">{formattedDay}</span>
    </div>
  );
}
