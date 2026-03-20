export default async function getRestaurants() {
  const res = await fetch("http://localhost:5000/api/v1/restaurants");
  const data = await res.json();
  return data;
}
