const API_BASE_URL = "http://localhost:5000/api/v1";

export default async function updateReservation(
  reservationId: string,
  reservationDate: string,
  tableCount: number,
  token: string
) {
  const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reservationDate, tableCount }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update reservation");
  }

  return response.json();
}
