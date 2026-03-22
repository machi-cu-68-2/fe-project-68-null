import { Restaurant } from "@/interface/Restaurant";

export default async function getRestaurants(query?: string): Promise<{ success: boolean, count: number, data: Restaurant[] }> {
  let url = "http://localhost:5000/api/v1/restaurants";
  if (query) {
    url += `?name[regex]=${encodeURIComponent(query)}&name[options]=i`;
  }
  const res = await fetch(url, { next: { revalidate: 3600 } });
  const data = await res.json();
  return data;
}
