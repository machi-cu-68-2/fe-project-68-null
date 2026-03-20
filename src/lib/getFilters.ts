export default async function getFilters() {
  const res = await fetch("http://localhost:5000/api/v1/restaurants/filters");
  const data = await res.json();
  return data;
}
