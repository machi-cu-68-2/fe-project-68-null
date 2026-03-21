import { Restaurant } from "@/interface/Restaurant";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

// ดึงร้านทั้งหมด
export async function getRestaurantsAdmin(token: string): Promise<Restaurant[]> {
  const res = await fetch(`${API}/restaurants?limit=100`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch restaurants");
  const data = await res.json();
  return data.data;
}

// ดึงร้านตาม id
export async function getRestaurantById(id: string, token: string): Promise<Restaurant> {
  const res = await fetch(`${API}/restaurants/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Restaurant not found");
  const data = await res.json();
  return data.data;
}

// สร้างร้านใหม่
export async function createRestaurant(body: Partial<Restaurant>, token: string) {
  const res = await fetch(`${API}/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Failed to create restaurant");
  }
  return res.json();
}

// แก้ไขร้าน
export async function updateRestaurant(id: string, body: Partial<Restaurant>, token: string) {
  const res = await fetch(`${API}/restaurants/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Failed to update restaurant");
  }
  return res.json();
}

// ลบร้าน
export async function deleteRestaurant(id: string, token: string) {
  const res = await fetch(`${API}/restaurants/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete restaurant");
  return res.json();
}
