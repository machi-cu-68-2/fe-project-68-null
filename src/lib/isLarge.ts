import { Restaurant } from "@/interface/Restaurant";

// Determines if a restaurant card should be displayed in the large format
export function isLarge(restaurant: Restaurant): boolean {
  // We can adjust this logic based on specific requirements.
  // For the mock data, the highest rated restaurant takes the large card, which has a 4.9 rating.
  return Number(restaurant.rating) >= 4.9;
}
