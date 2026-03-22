import { Restaurant } from "@/interface/Restaurant";

export default async function getRestaurant(id: string): Promise<Restaurant> {
  const res = await fetch(`http://localhost:5000/api/v1/restaurants/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Failed to fetch restaurant");
  }
  const data = await res.json();
  return data.data; // The API returns { success: true, data: { ... } }
}
