export default async function userRegister(
  name: string,
  tel: string,
  email: string,
  password: string,
) {
  const response = await fetch("http://localhost:5000/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      tel: tel,
      email: email,
      password: password,
      role: "user", // Default role
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register user");
  }

  return response.json();
}
