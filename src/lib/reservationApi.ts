const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export interface Reservation {
  _id: string;
  reservationDate: string;
  endTime: string;
  tableCount: number;
  user: string;
  restaurant: {
    _id: string;
    name: string;
    location: string;
    tel?: string;
  };
  createdAt: string;
}

// ดึงการจองทั้งหมด (admin = ทุกคน, user = ของตัวเอง)
export async function getReservations(token: string): Promise<Reservation[]> {
  const res = await fetch(`${API}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch reservations");
  const data = await res.json();
  return data.data;
}

// ลบการจอง
export async function deleteReservation(id: string, token: string) {
  const res = await fetch(`${API}/reservations/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete reservation");
  return res.json();
}

// แก้ไขการจอง
export async function updateReservation(
  id: string,
  body: { reservationDate?: string; tableCount?: number },
  token: string,
) {
  const res = await fetch(`${API}/reservations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Failed to update reservation");
  }
  return res.json();
}

// สร้างการจองใหม่
export async function createReservation(
  restaurantId: string,
  body: { reservationDate: string; tableCount: number },
  token: string,
) {
  const res = await fetch(`${API}/restaurants/${restaurantId}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Failed to create reservation");
  }
  return res.json();
}
