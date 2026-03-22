/**
 * Generate 30-minute time slots between open and close times.
 * Format: "HH:MM AM/PM"
 */
export default function generateTimeSlots(open: string, close: string): string[] {
  const slots: string[] = [];
  let [h, m] = open.split(":").map(Number);
  const [endH, endM] = close.split(":").map(Number);

  while (h < endH || (h === endH && m < endM)) {
    const period = h >= 12 ? "PM" : "AM";
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m === 0 ? "00" : m;
    slots.push(`${displayH}:${displayM} ${period}`);

    m += 30;
    if (m >= 60) {
      h += 1;
      m = 0;
    }
  }
  return slots;
}
