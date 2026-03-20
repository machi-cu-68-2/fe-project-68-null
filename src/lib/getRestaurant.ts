export default async function getRestaurants(query?: string) {
  let url = "http://localhost:5000/api/v1/restaurants";
  if (query) {
    url += `?name[regex]=${encodeURIComponent(query)}&name[options]=i`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
