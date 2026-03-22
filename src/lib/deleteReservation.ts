const API_BASE_URL = "http://localhost:5000/api/v1";

export default async function deleteReservation(reservationId: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete reservation");
  }

  return response.json();
}
