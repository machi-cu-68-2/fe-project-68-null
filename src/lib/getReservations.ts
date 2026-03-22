const API_BASE_URL = "http://localhost:5000/api/v1";

export default async function getReservations(token: string) {
  const response = await fetch(`${API_BASE_URL}/reservations`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch reservations");
  }

  return response.json();
}
