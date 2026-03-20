// ลบโค้ดเดิมในไฟล์ getDiffDay.ts แล้วใช้โค้ดนี้แทนครับ

export function getDiffDay(dateString: string): string {
  const now = new Date();
  const target = new Date(dateString);

  // เช็คว่าใส่วันที่มาถูกฟอร์แมตไหม
  if (isNaN(target.getTime())) return "Invalid date format.";

  // หาผลต่างของเวลา
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) return "The appointment time has passed.";

  // ดึงค่าปัจจุบันกับอนาคตมาลบกัน
  let years = target.getFullYear() - now.getFullYear();
  let months = target.getMonth() - now.getMonth();
  let days = target.getDate() - now.getDate();
  let hours = target.getHours() - now.getHours();
  let minutes = target.getMinutes() - now.getMinutes();

  // --- เริ่มกระบวนการยืมเวลา (คล้ายๆ ลบเลขแล้วขอยืมหลักหน้า) ---
  
  // ถ้านาทีติดลบ ให้ยืม 1 ชั่วโมง (60 นาที) มาบวก
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  
  // ถ้าชั่วโมงติดลบ ให้ยืม 1 วัน (24 ชั่วโมง) มาบวก
  if (hours < 0) {
    hours += 24;
    days--;
  }
  
  // ถ้าวันติดลบ ให้ยืมเดือนก่อนหน้ามาบวก (เช็คว่าเดือนก่อนหน้ามีกี่วัน)
  if (days < 0) {
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  
  // ถ้าเดือนติดลบ ให้ยืม 1 ปี (12 เดือน) มาบวก
  if (months < 0) {
    months += 12;
    years--;
  }

  // --- เอาตัวเลขมาต่อเป็นข้อความ ---
  const parts: string[] = [];
  
  if (years > 0) parts.push(`${years} Y`);
  if (months > 0) parts.push(`${months} M`);
  if (days > 0) parts.push(`${days} D`);
  if (hours > 0) parts.push(`${hours} h`);
  if (minutes > 0) parts.push(`${minutes} m`);

  // กรณีเหลือไม่ถึง 1 นาที
  if (parts.length === 0) return "Less than 1 minute";

  return parts.join(" ");
}