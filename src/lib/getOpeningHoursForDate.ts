import { OpeningHour } from "@/interface/Restaurant";

/**
 * Get opening hours for a specific date from a restaurant's opening hours array.
 */
export default function getOpeningHoursForDate(
  openingHours: OpeningHour[] | undefined,
  dateString: string
): OpeningHour | null {
  if (!openingHours) return null;
  const date = new Date(dateString);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  return openingHours.find((h) => h.day === dayName) || null;
}
